# Daraja MCP Server - Docker Setup

This guide explains how to run the Daraja MCP Server in a Docker container.

## Prerequisites

- Docker and Docker Compose installed
- The `daraja_docs_v3` directory with scraped documentation

## Quick Start

### 1. Build the Docker Image

```bash
# Using npm scripts
pnpm run docker:build

# Or using docker-compose directly
docker-compose build
```

### 2. Start the Container

```bash
# Using npm scripts
pnpm run docker:start

# Or using docker-compose directly
docker-compose up -d
```

### 3. Check Status

```bash
# Using npm scripts
pnpm run docker:status

# Or using docker-compose directly
docker-compose ps
```

## Available Commands

### NPM Scripts

```bash
pnpm run docker:build     # Build the Docker image
pnpm run docker:start     # Start the container
pnpm run docker:stop      # Stop the container
pnpm run docker:restart   # Restart the container
pnpm run docker:logs      # View container logs
pnpm run docker:status    # Check container status
pnpm run docker:shell     # Open shell in container
pnpm run docker:clean     # Remove container and image
```

### PowerShell Scripts (Windows)

```powershell
# Load the PowerShell module
. .\docker-scripts.ps1

# Use the functions
Build-DarajaMCP
Start-DarajaMCP
Status-DarajaMCP
Show-DarajaMCPLogs
```

### Shell Scripts (Linux/Mac)

```bash
# Make executable (Linux/Mac only)
chmod +x docker-scripts.sh

# Use the script
./docker-scripts.sh build
./docker-scripts.sh start
./docker-scripts.sh status
./docker-scripts.sh logs
```

## Configuration for MCP

When running in Docker, update your `.kiro/settings/mcp.json`:

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

## Troubleshooting

### Container Won't Start

1. Check if the documentation directory exists:
   ```bash
   ls -la ../daraja_docs_v3
   ```

2. View container logs:
   ```bash
   pnpm run docker:logs
   ```

### Documentation Not Found

Make sure the `daraja_docs_v3` directory is in the parent directory of your project:

```
daraja_scrapper/
├── daraja_docs_v3/          # Documentation directory
│   └── data_index.json
└── mpesa-daraja-mcp/        # Your MCP server
    ├── Dockerfile
    └── docker-compose.yml
```

### MCP Connection Issues

1. Ensure the container is running:
   ```bash
   pnpm run docker:status
   ```

2. Test the container directly:
   ```bash
   pnpm run docker:shell
   # Inside container:
   node dist/index.js
   ```

## Development

For development, you can mount your source code:

```yaml
# Add to docker-compose.yml volumes section
volumes:
  - ../daraja_docs_v3:/app/daraja_docs_v3:ro
  - ./src:/app/src:ro  # Mount source for development
```

Then rebuild when you make changes:

```bash
pnpm run docker:build
pnpm run docker:restart
```

## Production Deployment

For production, consider:

1. Using a specific Node.js version tag
2. Multi-stage builds to reduce image size
3. Health checks
4. Resource limits
5. Logging configuration

Example production docker-compose.yml additions:

```yaml
services:
  daraja-mcp:
    # ... existing config
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    healthcheck:
      test: ["CMD", "node", "-e", "process.exit(0)"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```