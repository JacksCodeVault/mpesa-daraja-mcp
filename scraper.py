#!/usr/bin/env python3
"""
Daraja API Documentation Scraper

This script scrapes comprehensive documentation from Safaricom's Daraja API portal,
including all API endpoints, images, and metadata. The scraped data is formatted
for consumption by the MCP server.

Features:
- Automated authentication with session persistence
- Complete documentation scraping for 22+ APIs
- Image downloading with local referencing
- Markdown conversion with clean formatting
- Structured data index generation

Usage:
    python scraper.py

Requirements:
    - Python 3.8+
    - Playwright browser automation
    - BeautifulSoup for HTML parsing
    - Markdownify for HTML to Markdown conversion

Author: Daraja Documentation Team
License: MIT
"""

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
    Downloads image using the browser context to share cookies and authentication.
    
    Args:
        page: Playwright page object with authentication context
        img_url: URL of the image to download
        local_filename: Local path where image should be saved
        
    Returns:
        bool: True if download successful, False otherwise
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
        print(f"    Warning: Failed to download image {img_url}: {e}")
    return False

async def run():
    """
    Main scraper function that handles authentication, scraping, and data processing.
    
    This function:
    1. Sets up output directories
    2. Handles browser authentication with session persistence
    3. Scrapes all configured Daraja API endpoints
    4. Downloads and processes images with local referencing
    5. Converts HTML to markdown format
    6. Generates a structured index for MCP server consumption
    """
    # Setup directories
    os.makedirs(DOCS_DIR, exist_ok=True)
    os.makedirs(IMG_DIR, exist_ok=True)

    async with async_playwright() as p:
        # Browser Setup - Keep visible for login debugging
        browser = await p.chromium.launch(headless=False)
        
        # Load existing authentication or create new context
        if os.path.exists(AUTH_FILE) and os.path.getsize(AUTH_FILE) > 0:
            try:
                # Verify the auth file contains valid JSON
                with open(AUTH_FILE, 'r') as f:
                    json.load(f)
                print("Loading saved authentication session...")
                context = await browser.new_context(storage_state=AUTH_FILE)
            except (json.JSONDecodeError, Exception) as e:
                print(f"Saved session is corrupted ({e}). Starting fresh...")
                context = await browser.new_context()
        else:
            print("No session found. Creating new context.")
            context = await browser.new_context()

        page = await context.new_page()
        
        # Check authentication status with first URL
        print("Checking login status...")
        await page.goto(URLS[0], timeout=60000)
        await asyncio.sleep(3)  # Wait for UI to settle

        # Prompt for manual login if needed
        print("\nACTION REQUIRED: Check the browser window.")
        print("If you are not logged in, please log in now.")
        print("Press ENTER here once you can see the API documentation on screen.")
        input() 
        
        # Save session for future runs
        await context.storage_state(path=AUTH_FILE)
        print("Session saved for future use.")

        index_data = []

        print(f"Starting scrape of {len(URLS)} API endpoints...")

        for url in URLS:
            api_name = url.split("/")[-1]
            print(f"\nProcessing: {api_name}...")
            
            try:
                await page.goto(url, timeout=60000)
                await page.wait_for_load_state("networkidle")
                await page.wait_for_timeout(2000)  # Grace period for rendering

                # Extract HTML content from main container
                content_html = await page.evaluate("""() => {
                    const main = document.querySelector('main') || 
                                document.querySelector('.api-details-container') || 
                                document.body;
                    return main.innerHTML;
                }""")

                # Parse HTML with BeautifulSoup for image processing
                soup = BeautifulSoup(content_html, "html.parser")
                
                # Process and download images
                images = soup.find_all("img")
                for i, img in enumerate(images):
                    src = img.get("src")
                    if not src: 
                        continue

                    # Determine file extension
                    ext = "png"  # Default fallback
                    if ".svg" in src: 
                        ext = "svg"
                    elif ".jpg" in src or ".jpeg" in src: 
                        ext = "jpg"
                    
                    img_filename = f"{api_name}_img_{i}.{ext}"
                    local_path = os.path.join(IMG_DIR, img_filename)
                    
                    # Resolve full URL for downloading
                    full_img_url = urljoin(url, src)

                    # Download image and update reference
                    success = await download_image(page, full_img_url, local_path)
                    
                    if success:
                        # Update HTML to point to local relative path for Markdown
                        img['src'] = f"../images/{img_filename}"
                    else:
                        img['src'] = full_img_url  # Fallback to remote URL

                # Convert to Markdown format
                markdown_text = md(str(soup), heading_style="ATX", code_language="json")
                
                # Clean up excessive newlines
                markdown_text = re.sub(r'\n\s*\n', '\n\n', markdown_text)

                # Save Markdown file with header
                md_filename = os.path.join(DOCS_DIR, f"{api_name}.md")
                header = f"# {api_name}\n**Source:** {url}\n\n---\n\n"
                
                with open(md_filename, "w", encoding="utf-8") as f:
                    f.write(header + markdown_text)
                
                print(f"   Saved documentation: {api_name}.md")
                
                # Add to index for MCP server
                index_data.append({
                    "name": api_name,
                    "url": url,
                    "local_path": f"docs/{api_name}.md",
                    "description": f"Documentation for {api_name}"
                })

            except Exception as e:
                print(f"   Error processing {api_name}: {e}")

        # Save index file for MCP server consumption
        with open(os.path.join(OUTPUT_DIR, "data_index.json"), "w") as f:
            json.dump(index_data, f, indent=2)

        print(f"\nScraping completed successfully.")
        print(f"Documentation stored in: {OUTPUT_DIR}/")
        print(f"Total APIs processed: {len(index_data)}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())