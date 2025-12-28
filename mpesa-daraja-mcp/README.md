# Mpesa Daraja MCP Server

A Model Context Protocol (MCP) server that provides access to Safaricom's Daraja API documentation. This server allows AI assistants to query and retrieve comprehensive documentation for all Daraja APIs.

## Features

- **Search APIs**: Find specific Daraja APIs by name or description
- **Get Documentation**: Retrieve complete documentation for any API
- **List APIs**: View all available Daraja APIs
- **API Summaries**: Get quick overviews of API functionality

## Available Tools

### `search_daraja_apis`
Search through available Daraja API documentation.
- **Parameters**: `query` (optional) - Search term to filter APIs
- **Returns**: List of matching APIs with descriptions

### `get_daraja_api_doc`
Get the full documentation for a specific Daraja API.
- **Parameters**: `api_name` (required) - Name of the API
- **Returns**: Complete API documentation in markdown format

### `list_daraja_apis`
List all available Daraja APIs.
- **Parameters**: None
- **Returns**: Complete list of available APIs

### `get_api_summary`
Get a summary of a specific API including key endpoints.
- **Parameters**: `api_name` (required) - Name of the API
- **Returns**: Brief summary with key information

## Available APIs

The server provides documentation for 22 Daraja APIs including:

- **Core APIs**: Authorization, MpesaExpressSimulate (STK Push), CustomerToBusiness, BusinessToCustomer
- **Transaction APIs**: TransactionStatus, AccountBalance, Reversal
- **Business APIs**: BusinessPayBill, BusinessBuyGoods, B2BExpressCheckout
- **Advanced APIs**: DynamicQRCode, BillManager, TaxRemittance
- **Specialized APIs**: BusinessToPochi, MpesaRatiba, IotSimManagement, IMSI, Swap

## Prerequisites

1. **Scraped Documentation**: This server requires the Daraja documentation to be scraped first using the included scraper
2. **Node.js**: Version 18 or higher
3. **Documentation Path**: The server looks for `daraja_docs_v3` directory with scraped data

## Installation

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build
```

## Usage

### Development Mode
```bash
pnpm run dev
```

### Production Mode
```bash
pnpm run build
pnpm start
```

### MCP Configuration

Add this server to your MCP configuration:

```json
{
  "mcpServers": {
    "daraja-docs": {
      "command": "node",
      "args": ["path/to/mpesa-daraja-mcp/dist/index.js"],
      "cwd": "path/to/mpesa-daraja-mcp"
    }
  }
}
```

## Project Structure

```
mpesa-daraja-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (after build)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Data Requirements

The server expects the scraped Daraja documentation in this structure:

```
daraja_docs_v3/
├── data_index.json       # Index of all APIs
├── docs/                 # Markdown documentation files
│   ├── Authorization.md
│   ├── MpesaExpressSimulate.md
│   └── ...
└── images/              # Downloaded images
    └── ...
```

## Error Handling

- If documentation is not found, the server will provide helpful error messages
- Invalid API names will return a list of available APIs
- Missing files are handled gracefully with appropriate fallbacks

## Development

To extend this server:

1. Add new tools in the `server.tool()` sections
2. Extend the `DarajaDocumentationService` class for new functionality
3. Update the documentation and type definitions as needed

## License

MIT License