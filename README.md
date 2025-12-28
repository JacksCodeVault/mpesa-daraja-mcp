# Daraja API Documentation Scraper & MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://docker.com/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.io/)

A comprehensive toolkit for accessing Safaricom's Daraja API documentation through web scraping and Model Context Protocol (MCP) integration. This project provides both a powerful scraper for keeping documentation up-to-date and a professional MCP server for AI assistant integration.

## ⚠️ Important Legal Notice & Disclaimers

### Data Source and Usage Rights

- **Documentation Source**: This project scrapes documentation from Safaricom's Daraja API portal
- **Authentication Required**: The scraper requires login credentials to access Safaricom's developer portal
- **Terms of Service**: Users must comply with [Safaricom's Terms of Service](https://developer.safaricom.co.ke/) when using the scraper
- **Data Ownership**: All scraped documentation remains the intellectual property of Safaricom PLC

### Legal Compliance

- **Personal Use**: This tool is intended for personal development and learning purposes
- **Commercial Use**: For commercial applications, ensure you have appropriate licenses from Safaricom
- **Rate Limiting**: The scraper includes delays to respect Safaricom's servers - do not modify these
- **Account Responsibility**: Users are responsible for their own Safaricom developer account credentials

### Disclaimers

- **No Warranty**: This software is provided "as is" without any warranties
- **Data Accuracy**: Scraped documentation may become outdated - always verify with official sources
- **Service Availability**: Safaricom may change their portal structure, potentially breaking the scraper
- **Legal Responsibility**: Users assume all legal responsibility for their use of this tool

### Ethical Usage Guidelines

- **Respect Rate Limits**: Do not overwhelm Safaricom's servers with excessive requests
- **Valid Credentials**: Only use your own legitimate Safaricom developer account
- **Data Sharing**: Be mindful of sharing scraped data - respect Safaricom's intellectual property
- **Updates**: Keep scraped documentation current and don't redistribute outdated information

**By using this software, you acknowledge that you have read, understood, and agree to comply with these terms and Safaricom's Terms of Service.**

## Features

- **Complete Documentation Scraper**: Automated scraping of all 22 Daraja APIs with images
- **Professional MCP Server**: Standards-compliant server for AI assistant integration
- **Docker Support**: Containerized deployment for consistent environments
- **Multi-Platform Support**: Works on Windows, macOS, and Linux
- **Editor Integration**: Compatible with Kiro, VSCode, Cursor, Windsurf, Claude Desktop, and more
- **Offline Ready**: Complete documentation dataset included for immediate use
- **Auto-Discovery**: Smart path detection for seamless setup

## Table of Contents

- [Important Legal Notice & Disclaimers](#️-important-legal-notice--disclaimers)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Docker Deployment](#docker-deployment)
- [Scraper Usage](#scraper-usage)
- [MCP Server Setup](#mcp-server-setup)
- [Editor Integration](#editor-integration)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contributing](#contributing)

## Quick Start

### Option 1: Docker Deployment (Recommended)

```bash
# Clone the repository
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp

# Build and start Docker container
cd mpesa-daraja-mcp
pnpm run docker:build
pnpm run docker:start

# Configure your editor (see Editor Integration section)
```

### Option 2: Native Installation

```bash
# Clone the repository
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp

# Setup MCP server
cd mpesa-daraja-mcp
pnpm install
pnpm run build

# Configure your editor (see Editor Integration section)
```

### Option 3: Fresh Scraping + MCP Setup

```bash
# Clone and setup scraper
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp

# Setup Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run scraper (requires Daraja portal login)
python scraper.py

# Setup MCP server
cd mpesa-daraja-mcp
pnpm install
pnpm run build
```

## Installation

### Prerequisites

- **Docker** (recommended) OR
- **Python 3.8+** (for scraper) + **Node.js 18+** (for MCP server)
- **Git** (for cloning)

### Platform-Specific Setup

#### Windows

```powershell
# Option 1: Docker (Recommended)
# Install Docker Desktop from https://docker.com
# Clone repository
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp\mpesa-daraja-mcp
pnpm run docker:build

# Option 2: Native Installation
# Install Python and Node.js from official websites
# Clone repository
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp

# Python setup (for scraper)
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Node.js setup (for MCP server)
cd mpesa-daraja-mcp
pnpm install
pnpm run build
```

#### macOS

```bash
# Option 1: Docker (Recommended)
# Install Docker Desktop from https://docker.com
brew install git
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp/mpesa-daraja-mcp
pnpm run docker:build

# Option 2: Native Installation
# Install dependencies via Homebrew
brew install python node git pnpm

# Clone repository
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp

# Python setup (for scraper)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Node.js setup (for MCP server)
cd mpesa-daraja-mcp
pnpm install
pnpm run build
```

#### Linux (Ubuntu/Debian)

```bash
# Option 1: Docker (Recommended)
# Install Docker
sudo apt update
sudo apt install docker.io docker-compose git
sudo usermod -aG docker $USER
# Log out and back in, then:
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp/mpesa-daraja-mcp
pnpm run docker:build

# Option 2: Native Installation
# Install dependencies
sudo apt update
sudo apt install python3 python3-venv nodejs npm git
npm install -g pnpm

# Clone repository
git clone https://github.com/JacksCodeVault/mpesa-daraja-mcp.git
cd mpesa-daraja-mcp

# Python setup (for scraper)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Node.js setup (for MCP server)
cd mpesa-daraja-mcp
pnpm install
pnpm run build
```

## Docker Deployment

Docker provides the most reliable and consistent deployment method across all platforms.

### Quick Docker Setup

```bash
cd mpesa-daraja-mcp

# Build the Docker image
pnpm run docker:build

# Start the container
pnpm run docker:start

# Check status
pnpm run docker:status

# View logs
pnpm run docker:logs
```

### Docker Management Commands

```bash
# Build and deployment
pnpm run docker:build     # Build the Docker image
pnpm run docker:start     # Start the container
pnpm run docker:stop      # Stop the container
pnpm run docker:restart   # Restart the container

# Monitoring and debugging
pnpm run docker:status    # Check container status
pnpm run docker:logs      # View container logs
pnpm run docker:shell     # Open shell in container

# Cleanup
pnpm run docker:clean     # Remove container and image
```

### Docker Configuration

The Docker setup includes:

- **Multi-stage build** for optimized image size
- **Non-root user** for security
- **Volume mounting** for documentation access
- **Health checks** for reliability
- **Resource limits** for production use

### Docker Compose Configuration

```yaml
# docker-compose.yml
services:
  daraja-mcp:
    build: .
    container_name: daraja-mcp-server
    restart: unless-stopped
    volumes:
      - ../daraja_docs_v3:/app/daraja_docs_v3:ro
    environment:
      - NODE_ENV=production
    stdin_open: true
    tty: true
```

### MCP Configuration for Docker

When using Docker, update your editor's MCP configuration:

```json
{
  "mcpServers": {
    "daraja-docs": {
      "command": "docker",
      "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"],
      "disabled": false,
      "autoApprove": [
        "search_daraja_apis",
        "get_daraja_api_doc",
        "list_apis_by_category",
        "get_api_summary",
        "get_server_stats",
        "compare_apis"
      ]
    }
  }
}
```

## Scraper Usage

**⚠️ IMPORTANT**: Before using the scraper, ensure you have:

- A valid Safaricom developer account
- Accepted Safaricom's Terms of Service
- Permission to access the documentation programmatically
- Understanding that you're responsible for compliance with Safaricom's policies

The scraper automatically downloads documentation for all 22 Daraja APIs with images.

### First Time Setup

1. **Activate Python environment**:

   ```bash
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   ```

2. **Run the scraper**:

   ```bash
   python scraper.py
   ```

3. **Login Process**:
   - Browser window opens automatically
   - Login to Daraja portal manually when prompted
   - Press ENTER in terminal after successful login
   - Scraper saves session for future use

### Updating Documentation

To get the latest API documentation:

```bash
# Activate environment
source venv/bin/activate

# Run scraper (uses saved session)
python scraper.py

# If session expired, login again when browser opens
```

### Output Structure

```text
daraja_docs_v3/
├── data_index.json          # API metadata and index
├── docs/                    # Markdown documentation
│   ├── Authorization.md
│   ├── MpesaExpressSimulate.md
│   └── ... (22 API files)
└── images/                  # Downloaded images
    ├── Authorization_img_0.svg
    └── ... (200+ images)
```

## MCP Server Setup

The MCP server provides AI assistants with access to Daraja documentation through 6 powerful tools.

### Native Build and Test

```bash
cd mpesa-daraja-mcp

# Install dependencies
pnpm install

# Build TypeScript
pnpm run build

# Test server can find documentation
pnpm test

# Run server (for testing)
pnpm run dev
```

### Available MCP Tools

The MCP server provides 6 comprehensive tools:

1. **`search_daraja_apis`** - Advanced search with category filtering
2. **`get_daraja_api_doc`** - Complete API documentation retrieval
3. **`list_apis_by_category`** - Organized API listing by categories
4. **`get_api_summary`** - Enhanced summaries with endpoints
5. **`get_server_stats`** - Usage statistics and monitoring
6. **`compare_apis`** - Side-by-side API comparison

### Server Configuration

The server automatically detects documentation in these locations:

- `../daraja_docs_v3` (relative to server)
- `./daraja_docs_v3` (current directory)
- `/app/daraja_docs_v3` (Docker container)
- Custom path via environment variable

## Editor Integration

### Kiro IDE

1. **Create MCP configuration file**:

   ```bash
   # Create .kiro/settings/mcp.json in your workspace
   mkdir -p .kiro/settings
   ```

2. **Docker Configuration** (Recommended):

   ```json
   {
     "mcpServers": {
       "daraja-docs": {
         "command": "docker",
         "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"],
         "disabled": false,
         "autoApprove": [
           "search_daraja_apis",
           "get_daraja_api_doc",
           "list_apis_by_category",
           "get_api_summary",
           "get_server_stats",
           "compare_apis"
         ]
       }
     }
   }
   ```

3. **Native Configuration**:

   ```json
   {
     "mcpServers": {
       "daraja-docs": {
         "command": "node",
         "args": ["mpesa-daraja-mcp/dist/index.js"],
         "disabled": false,
         "autoApprove": [
           "search_daraja_apis",
           "get_daraja_api_doc",
           "list_apis_by_category",
           "get_api_summary",
           "get_server_stats",
           "compare_apis"
         ]
       }
     }
   }
   ```

### VSCode with MCP Extensions

1. **Install MCP extension** (if available)
2. **Configure in settings.json**:

   ```json
   {
     "mcp.servers": {
       "daraja-docs": {
         "command": "docker",
         "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"]
       }
     }
   }
   ```

### Cursor IDE

1. **Open Cursor settings**
2. **Add MCP server configuration**:

   ```json
   {
     "mcp": {
       "servers": {
         "daraja-docs": {
           "command": "docker",
           "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"]
         }
       }
     }
   }
   ```

### Windsurf

1. **Access Windsurf MCP settings**
2. **Add server configuration**:

   ```json
   {
     "mcpServers": {
       "daraja-docs": {
         "command": "docker",
         "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"]
       }
     }
   }
   ```

### Claude Desktop

1. **Edit Claude config file**:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add server configuration**:

   ```json
   {
     "mcpServers": {
       "daraja-docs": {
         "command": "docker",
         "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"]
       }
     }
   }
   ```

### Generic MCP Client

For any MCP-compatible client using Docker:

```json
{
  "servers": {
    "daraja-docs": {
      "command": "docker",
      "args": ["exec", "-i", "daraja-mcp-server", "node", "dist/index.js"],
      "env": {}
    }
  }
}
```

For native installation:

```json
{
  "servers": {
    "daraja-docs": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/absolute/path/to/mpesa-daraja-mcp",
      "env": {}
    }
  }
}
```

## API Documentation

### Available APIs

The project includes comprehensive documentation for 22 Daraja APIs organized into 6 categories:

#### Core Payment APIs

- **Authorization** - OAuth token generation and management
- **MpesaExpressSimulate** - STK Push payment initiation
- **MpesaExpressQuery** - STK Push transaction status queries

#### Payment Processing

- **CustomerToBusiness** - C2B payment processing
- **BusinessToCustomer** - B2C payment disbursements
- **CustomerToBusinessRegisterURL** - C2B URL registration

#### Transaction Management

- **TransactionStatus** - Transaction status verification
- **AccountBalance** - Account balance inquiries
- **Reversal** - Transaction reversal operations
- **PullTransaction** - Transaction detail retrieval

#### Business Operations

- **BusinessPayBill** - Bill payment processing
- **BusinessBuyGoods** - Goods purchase payments
- **B2BExpressCheckout** - Business-to-business transactions
- **BusinessToPochi** - Business to Pochi wallet transfers

#### Advanced Features

- **DynamicQRCode** - Dynamic QR code generation
- **BillManager** - Bill management and processing
- **TaxRemittance** - Tax payment processing
- **MpesaRatiba** - Scheduled payment management

#### Specialized Services

- **B2CAccountTopUp** - Account top-up services
- **Swap** - Currency swap operations
- **IMSI** - SIM card management services
- **IotSimManagement** - IoT SIM card management

### Using the MCP Tools

#### Advanced API Search

Use search_daraja_apis tool with powerful filtering:

- Query: "payment" + Category: "core" → Core payment APIs
- Query: "balance" → AccountBalance and related APIs
- Category: "business" → All business operation APIs
- No parameters → All 22 APIs with categories

#### Complete Documentation Access

Use get_daraja_api_doc tool for full documentation:

- api_name: "Authorization" → Complete OAuth implementation guide
- api_name: "MpesaExpressSimulate" → Full STK Push documentation
- Includes code examples, parameters, and response formats

#### Enhanced API Summaries

Use get_api_summary tool for quick overviews:

- api_name: "BusinessToCustomer" → Summary with key endpoints
- include_endpoints: true → Includes endpoint URLs
- Perfect for quick reference and comparison

#### API Comparison

Use compare_apis tool for side-by-side analysis:

- api_names: ["Authorization", "MpesaExpressSimulate"] → Compare auth vs payment
- comparison_aspects: ["endpoints", "authentication"] → Focus on specific aspects
- Supports 2-4 APIs simultaneously

#### Usage Statistics

Use get_server_stats tool for monitoring:

- Total API count and categories
- Most accessed APIs
- Request statistics
- Server health information

#### Category-Based Browsing

Use list_apis_by_category tool for organized access:

- category: "payments" → All payment-related APIs
- No category → List all categories with counts
- Perfect for discovering related APIs

## Troubleshooting

### Docker Issues

#### Container Won't Start

```bash
# Check Docker is running
docker --version
docker-compose --version

# View detailed logs
pnpm run docker:logs

# Rebuild if needed
pnpm run docker:clean
pnpm run docker:build
```

#### Documentation Not Found in Container

```bash
# Check volume mounting
docker inspect daraja-mcp-server

# Verify documentation exists
ls -la ../daraja_docs_v3/data_index.json

# Test container access
pnpm run docker:shell
ls -la /app/daraja_docs_v3/
```

#### MCP Connection Issues with Docker

```bash
# Ensure container is running
pnpm run docker:status

# Test MCP tools directly
docker exec -i daraja-mcp-server node dist/index.js

# Check container logs for errors
pnpm run docker:logs
```

### Native Installation Issues

#### MCP Server Issues

**Server won't start**:

```bash
# Check Node.js version
node --version  # Should be 18+

# Rebuild server
cd mpesa-daraja-mcp
pnpm run clean
pnpm install
pnpm run build
```

**Documentation not found**:

```bash
# Test documentation detection
pnpm test

# Check paths manually
ls -la ../daraja_docs_v3/data_index.json
```

**TypeScript errors**:

```bash
# Update dependencies
pnpm update
pnpm run build

# Check for syntax errors
pnpm run dev
```

#### Scraper Issues

**Browser doesn't open**:

```bash
# Install browser dependencies
playwright install chromium

# Check Python version
python --version  # Should be 3.8+
```

**Login session expired**:

```bash
# Delete auth file and re-login
rm auth.json
python scraper.py
```

**Permission errors**:

```bash
# Check file permissions
chmod +x scraper.py
# Or run with python explicitly
python scraper.py
```

### Editor Integration Issues

#### MCP Server Not Connecting

1. **Verify Docker container is running**:

   ```bash
   pnpm run docker:status
   ```

2. **Check MCP configuration syntax**:
   - Ensure JSON is valid
   - Verify command and args are correct
   - Use absolute paths for native installation

3. **Test server manually**:

   ```bash
   # Docker
   docker exec -i daraja-mcp-server node dist/index.js
   
   # Native
   cd mpesa-daraja-mcp
   node dist/index.js
   ```

4. **Restart editor** after configuration changes

#### Tools Not Appearing

1. **Check server logs** in editor's MCP panel
2. **Verify autoApprove list** includes desired tools
3. **Ensure server builds successfully**: `pnpm run build`
4. **Test with minimal configuration** first

### Platform-Specific Issues

#### Windows Platform Issues

- **Use forward slashes** in Docker paths: `C:/path/to/project`
- **Run PowerShell as Administrator** if Docker permission issues
- **Check Windows Defender** isn't blocking Docker or Node.js
- **Use WSL2** for better Docker performance

#### macOS Platform Issues

- **Install Xcode Command Line Tools**: `xcode-select --install`
- **Use Homebrew** for dependency management: `brew install docker`
- **Check Docker Desktop** is running and configured
- **Verify file permissions**: `chmod +x docker-scripts.sh`

#### Linux Platform Issues

- **Add user to docker group**: `sudo usermod -aG docker $USER`
- **Install build essentials**: `sudo apt install build-essential`
- **Check Docker service**: `sudo systemctl status docker`
- **Verify Node.js installation**: `which node`

### Performance Optimization

#### Docker Performance

```bash
# Limit container resources
docker update --memory=512m --cpus="0.5" daraja-mcp-server

# Use multi-stage builds for smaller images
# (Already implemented in Dockerfile)

# Clean up unused Docker resources
docker system prune -a
```

#### MCP Server Performance

```bash
# Monitor server stats
# Use get_server_stats tool to track usage

# Optimize documentation loading
# Server caches documentation on startup

# Use appropriate log levels
NODE_ENV=production pnpm run docker:start
```

### Getting Help

1. **Check logs first**: Both Docker and native installations provide detailed error messages
2. **Test components individually**: Use `pnpm test` to verify MCP server setup
3. **Verify paths and permissions**: Ensure all file paths are correct and accessible
4. **Update dependencies**: Keep Docker, Node.js, and Python packages current
5. **Use Docker for consistency**: Docker eliminates most platform-specific issues

## Contributing

**⚠️ Data Handling Guidelines for Contributors**:

- **No Scraped Data in PRs**: Do not include scraped documentation in pull requests
- **Respect IP Rights**: Ensure contributions don't violate Safaricom's intellectual property
- **Code Only**: Contribute improvements to the scraper and MCP server code, not the data
- **Documentation**: Update README and code comments, not scraped API documentation

### Development Setup

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Setup development environment**:

   ```bash
   # Docker development (recommended)
   cd mpesa-daraja-mcp
   pnpm run docker:build
   pnpm run docker:start
   
   # Native development
   # Python development
   pip install -r requirements-dev.txt  # If exists
   
   # Node.js development
   cd mpesa-daraja-mcp
   pnpm install
   pnpm run dev
   ```

### Adding New APIs

1. **Update scraper URLs**:

   ```python
   URLS = [
       "https://developer.safaricom.co.ke/apis/NewAPI",
       # ... existing URLs
   ]
   ```

2. **Test scraping**:

   ```bash
   python scraper.py
   ```

3. **Update API categorization**:

   ```typescript
   // In mpesa-daraja-mcp/src/config.ts
   API_CATEGORIES: {
     new_category: ["NewAPI"],
     // ... existing categories
   }
   ```

4. **Verify MCP server**:

   ```bash
   cd mpesa-daraja-mcp
   pnpm test
   pnpm run docker:build
   ```

### Code Style

- **Python**: Follow PEP 8, use `black` formatter
- **TypeScript**: Use Prettier formatting, ESLint rules
- **Docker**: Follow best practices for multi-stage builds
- **Commits**: Use conventional commit format

### Testing

```bash
# Test scraper
python scraper.py --test-mode

# Test MCP server (native)
cd mpesa-daraja-mcp
pnpm test
pnpm run build

# Test MCP server (Docker)
pnpm run docker:build
pnpm run docker:start
pnpm run docker:logs
```

### Documentation

- Update README for new features
- Add inline code comments
- Update API documentation
- Include Docker-specific instructions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**⚠️ Important License Clarification**:

- **Software License**: The MIT License applies only to the scraper and MCP server code
- **Documentation Rights**: Scraped Daraja API documentation remains the property of Safaricom PLC
- **Separate Terms**: Use of Safaricom's documentation is subject to their Terms of Service
- **No Transfer**: This license does not grant rights to Safaricom's intellectual property

### What this means

- ✅ **Commercial use** - Use this project in commercial applications
- ✅ **Modification** - Modify the source code to fit your needs
- ✅ **Distribution** - Distribute copies of the software
- ✅ **Private use** - Use the software for private purposes
- ❌ **Liability** - The authors are not liable for any damages
- ❌ **Warranty** - The software is provided "as is" without warranty

### Attribution

If you use this project, please consider:

- ⭐ **Starring the repository** on GitHub
- 📝 **Mentioning the project** in your documentation
- 🔗 **Linking back** to the original repository

## Acknowledgments

- **Safaricom** for providing the Daraja API platform
- **Model Context Protocol team** for the MCP standard
- **Playwright team** for the excellent automation framework
- **Docker community** for containerization best practices
- **Open source contributors** who make projects like this possible

## Repository Information

- **Repository**: [https://github.com/JacksCodeVault/mpesa-daraja-mcp](https://github.com/JacksCodeVault/mpesa-daraja-mcp)
- **Issues**: [Report bugs or request features](https://github.com/JacksCodeVault/mpesa-daraja-mcp/issues)
- **Discussions**: [Community discussions](https://github.com/JacksCodeVault/mpesa-daraja-mcp/discussions)
- **Releases**: [Latest releases](https://github.com/JacksCodeVault/mpesa-daraja-mcp/releases)

## Support

If you find this project helpful, please consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting issues** you encounter
- 💡 **Suggesting improvements**
- 🤝 **Contributing** to the project
- 📢 **Sharing** with others who might benefit

---

**Ready to integrate Daraja API documentation with your AI assistant?**

**Quick Start with Docker**: `cd mpesa-daraja-mcp && pnpm run docker:build && pnpm run docker:start`

**Browse the documentation**: Use the MCP tools to explore 22 comprehensive Daraja APIs

**Need help?** Check the [Troubleshooting](#troubleshooting) section or open an issue

**Start with the [Quick Start](#quick-start) guide and have your AI assistant accessing Daraja documentation in minutes!**
