import asyncio
import os
import re
import json
import base64
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright
from markdownify import markdownify as md
from bs4 import BeautifulSoup

# --- CONFIGURATION ---
BASE_URL = "https://developer.safaricom.co.ke"
OUTPUT_DIR = "daraja_docs_v3"
DOCS_DIR = os.path.join(OUTPUT_DIR, "docs")
IMG_DIR = os.path.join(OUTPUT_DIR, "images")
AUTH_FILE = "auth.json"

# exact links provided
URLS = [
    "https://developer.safaricom.co.ke/apis/Authorization",
    "https://developer.safaricom.co.ke/apis/DynamicQRCode",
    "https://developer.safaricom.co.ke/apis/CustomerToBusiness",
    "https://developer.safaricom.co.ke/apis/CustomerToBusinessRegisterURL",
    "https://developer.safaricom.co.ke/apis/MpesaExpressSimulate",
    "https://developer.safaricom.co.ke/apis/MpesaExpressQuery",
    "https://developer.safaricom.co.ke/apis/BusinessToCustomer",
    "https://developer.safaricom.co.ke/apis/TransactionStatus",
    "https://developer.safaricom.co.ke/apis/AccountBalance",
    "https://developer.safaricom.co.ke/apis/Reversal",
    "https://developer.safaricom.co.ke/apis/TaxRemittance",
    "https://developer.safaricom.co.ke/apis/BusinessPayBill",
    "https://developer.safaricom.co.ke/apis/BusinessBuyGoods",
    "https://developer.safaricom.co.ke/apis/BillManager",
    "https://developer.safaricom.co.ke/apis/B2BExpressCheckout",
    "https://developer.safaricom.co.ke/apis/PullTransaction",
    "https://developer.safaricom.co.ke/apis/BusinessToPochi",
    "https://developer.safaricom.co.ke/apis/Swap",
    "https://developer.safaricom.co.ke/apis/IMSI",
    "https://developer.safaricom.co.ke/apis/B2CAccountTopUp",
    "https://developer.safaricom.co.ke/apis/MpesaRatiba",
    "https://developer.safaricom.co.ke/apis/IotSimManagement"
]

async def download_image(page, img_url, local_filename):
    """
    Downloads image using the browser context (to share cookies/auth).
    """
    try:
        # If it's a base64 string, save directly
        if img_url.startswith("data:image"):
            header, encoded = img_url.split(",", 1)
            data = base64.b64decode(encoded)
            with open(local_filename, "wb") as f:
                f.write(data)
            return True

        # Use Playwright's API request context to fetch with current cookies
        response = await page.request.get(img_url)
        if response.status == 200:
            data = await response.body()
            with open(local_filename, "wb") as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"    ⚠️ Failed to download image {img_url}: {e}")
    return False

async def run():
    # Setup directories
    os.makedirs(DOCS_DIR, exist_ok=True)
    os.makedirs(IMG_DIR, exist_ok=True)

    async with async_playwright() as p:
        # Browser Setup
        browser = await p.chromium.launch(headless=False) # Keep visible to debug login
        
        # Load Auth or Create New
        if os.path.exists(AUTH_FILE):
            print("🔑 Loading saved session...")
            context = await browser.new_context(storage_state=AUTH_FILE)
        else:
            print("👋 No session found. Creating new context.")
            context = await browser.new_context()

        page = await context.new_page()
        
        # Check Login Status (Quick check on first URL)
        print("🕵️ Checking login status...")
        await page.goto(URLS[0], timeout=60000)
        await asyncio.sleep(3) # Wait for UI to settle

        # Logic to detect if login is needed (Modify selector based on actual login button/modal)
        # Assuming if we see 'Sign In' or don't see content, we pause.
        print("\n🛑 CHECK BROWSER: If asked to login, please do so now.")
        print("👉 Press ENTER here once you can see the API documentation on screen.")
        input() 
        
        # Save session for future runs
        await context.storage_state(path=AUTH_FILE)
        print("💾 Session saved.")

        index_data = []

        print(f"🚀 Starting scrape of {len(URLS)} pages...")

        for url in URLS:
            api_name = url.split("/")[-1]
            print(f"\nProcessing: {api_name}...")
            
            try:
                await page.goto(url, timeout=60000)
                await page.wait_for_load_state("networkidle")
                await page.wait_for_timeout(2000) # Grace period for rendering

                # Extract HTML
                content_html = await page.evaluate("""() => {
                    const main = document.querySelector('main') || document.querySelector('.api-details-container') || document.body;
                    return main.innerHTML;
                }""")

                # Parse HTML with BeautifulSoup to handle images
                soup = BeautifulSoup(content_html, "html.parser")
                
                # Process Images
                images = soup.find_all("img")
                for i, img in enumerate(images):
                    src = img.get("src")
                    if not src: continue

                    # Clean filename
                    ext = "png" # Default fallback
                    if ".svg" in src: ext = "svg"
                    elif ".jpg" in src or ".jpeg" in src: ext = "jpg"
                    
                    img_filename = f"{api_name}_img_{i}.{ext}"
                    local_path = os.path.join(IMG_DIR, img_filename)
                    
                    # Resolve full URL
                    full_img_url = urljoin(url, src)

                    # Download
                    success = await download_image(page, full_img_url, local_path)
                    
                    if success:
                        # Update HTML to point to local relative path for Markdown
                        # We use relative path from the 'docs' folder to 'images' folder
                        img['src'] = f"../images/{img_filename}"
                    else:
                        img['src'] = full_img_url # Fallback to remote URL

                # Convert to Markdown
                markdown_text = md(str(soup), heading_style="ATX", code_language="json")
                
                # Cleanup excessive newlines
                markdown_text = re.sub(r'\n\s*\n', '\n\n', markdown_text)

                # Save Markdown
                md_filename = os.path.join(DOCS_DIR, f"{api_name}.md")
                header = f"# {api_name}\n**Source:** {url}\n\n---\n\n"
                
                with open(md_filename, "w", encoding="utf-8") as f:
                    f.write(header + markdown_text)
                
                print(f"   ✅ Saved Doc: {api_name}.md")
                
                # Add to Index
                index_data.append({
                    "name": api_name,
                    "url": url,
                    "local_path": f"docs/{api_name}.md",
                    "description": f"Documentation for {api_name}"
                })

            except Exception as e:
                print(f"   ❌ Failed to process {api_name}: {e}")

        # Save Index File (Crucial for MCP)
        with open(os.path.join(OUTPUT_DIR, "data_index.json"), "w") as f:
            json.dump(index_data, f, indent=2)

        print("\n✨ Scrape Complete!")
        print(f"📂 Data stored in: {OUTPUT_DIR}/")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())