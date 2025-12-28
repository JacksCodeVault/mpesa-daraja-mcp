#!/usr/bin/env python3
"""
Setup script for Daraja API Documentation Scraper

This script helps set up the scraper environment by:
1. Installing Python dependencies
2. Installing Playwright browser binaries
3. Verifying the setup

Usage:
    python setup_scraper.py
"""

import subprocess
import sys
import os

def run_command(command, description):
    """Run a command and handle errors gracefully."""
    print(f"\n{description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e.stderr}")
        return False

def main():
    """Main setup function."""
    print("🚀 Setting up Daraja API Documentation Scraper")
    print("=" * 50)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is required")
        sys.exit(1)
    
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro} detected")
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        print("\n⚠️  Failed to install dependencies. Try running manually:")
        print("pip install -r requirements.txt")
        return
    
    # Install Playwright browsers
    if not run_command("playwright install chromium", "Installing Playwright Chromium browser"):
        print("\n⚠️  Failed to install Playwright browsers. Try running manually:")
        print("playwright install chromium")
        return
    
    # Verify setup
    print("\n🔍 Verifying setup...")
    
    try:
        import playwright
        import bs4
        import markdownify
        print("✅ All Python packages imported successfully")
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return
    
    print("\n🎉 Setup completed successfully!")
    print("\nYou can now run the scraper with:")
    print("python scraper.py")
    
    print("\nNote: The scraper will open a browser window for authentication.")
    print("Make sure you have valid Safaricom Developer Portal credentials.")

if __name__ == "__main__":
    main()