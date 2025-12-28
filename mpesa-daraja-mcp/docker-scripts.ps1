# Docker management scripts for Daraja MCP Server

# Build the Docker image
function Build-DarajaMCP {
    Write-Host "Building Daraja MCP Docker image..." -ForegroundColor Green
    docker-compose build
}

# Start the MCP server container
function Start-DarajaMCP {
    Write-Host "Starting Daraja MCP server..." -ForegroundColor Green
    docker-compose up -d
}

# Stop the MCP server container
function Stop-DarajaMCP {
    Write-Host "Stopping Daraja MCP server..." -ForegroundColor Yellow
    docker-compose down
}

# View logs
function Show-DarajaMCPLogs {
    Write-Host "Showing Daraja MCP server logs..." -ForegroundColor Blue
    docker-compose logs -f daraja-mcp
}

# Restart the container
function Restart-DarajaMCP {
    Write-Host "Restarting Daraja MCP server..." -ForegroundColor Yellow
    docker-compose restart
}

# Check container status
function Status-DarajaMCP {
    Write-Host "Daraja MCP server status:" -ForegroundColor Blue
    docker-compose ps
}

# Interactive shell into container
function Shell-DarajaMCP {
    Write-Host "Opening shell in Daraja MCP container..." -ForegroundColor Blue
    docker-compose exec daraja-mcp sh
}

# Clean up (remove container and image)
function Clean-DarajaMCP {
    Write-Host "Cleaning up Daraja MCP resources..." -ForegroundColor Red
    docker-compose down --rmi all --volumes
}

# Export functions
Export-ModuleMember -Function Build-DarajaMCP, Start-DarajaMCP, Stop-DarajaMCP, Show-DarajaMCPLogs, Restart-DarajaMCP, Status-DarajaMCP, Shell-DarajaMCP, Clean-DarajaMCP

Write-Host "Daraja MCP Docker management functions loaded!" -ForegroundColor Green
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  Build-DarajaMCP     - Build the Docker image" -ForegroundColor White
Write-Host "  Start-DarajaMCP     - Start the container" -ForegroundColor White
Write-Host "  Stop-DarajaMCP      - Stop the container" -ForegroundColor White
Write-Host "  Restart-DarajaMCP   - Restart the container" -ForegroundColor White
Write-Host "  Status-DarajaMCP    - Check container status" -ForegroundColor White
Write-Host "  Show-DarajaMCPLogs  - View container logs" -ForegroundColor White
Write-Host "  Shell-DarajaMCP     - Open shell in container" -ForegroundColor White
Write-Host "  Clean-DarajaMCP     - Remove container and image" -ForegroundColor White