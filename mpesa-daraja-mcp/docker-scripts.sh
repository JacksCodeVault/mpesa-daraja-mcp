#!/bin/bash

# Docker management scripts for Daraja MCP Server

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Build the Docker image
build() {
    echo -e "${GREEN}Building Daraja MCP Docker image...${NC}"
    docker-compose build
}

# Start the MCP server container
start() {
    echo -e "${GREEN}Starting Daraja MCP server...${NC}"
    docker-compose up -d
}

# Stop the MCP server container
stop() {
    echo -e "${YELLOW}Stopping Daraja MCP server...${NC}"
    docker-compose down
}

# View logs
logs() {
    echo -e "${BLUE}Showing Daraja MCP server logs...${NC}"
    docker-compose logs -f daraja-mcp
}

# Restart the container
restart() {
    echo -e "${YELLOW}Restarting Daraja MCP server...${NC}"
    docker-compose restart
}

# Check container status
status() {
    echo -e "${BLUE}Daraja MCP server status:${NC}"
    docker-compose ps
}

# Interactive shell into container
shell() {
    echo -e "${BLUE}Opening shell in Daraja MCP container...${NC}"
    docker-compose exec daraja-mcp sh
}

# Clean up (remove container and image)
clean() {
    echo -e "${RED}Cleaning up Daraja MCP resources...${NC}"
    docker-compose down --rmi all --volumes
}

# Help function
help() {
    echo -e "${GREEN}Daraja MCP Docker management commands:${NC}"
    echo -e "  ${BLUE}build${NC}    - Build the Docker image"
    echo -e "  ${BLUE}start${NC}    - Start the container"
    echo -e "  ${BLUE}stop${NC}     - Stop the container"
    echo -e "  ${BLUE}restart${NC}  - Restart the container"
    echo -e "  ${BLUE}status${NC}   - Check container status"
    echo -e "  ${BLUE}logs${NC}     - View container logs"
    echo -e "  ${BLUE}shell${NC}    - Open shell in container"
    echo -e "  ${BLUE}clean${NC}    - Remove container and image"
    echo -e "  ${BLUE}help${NC}     - Show this help message"
}

# Main command dispatcher
case "$1" in
    build)
        build
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    logs)
        logs
        ;;
    shell)
        shell
        ;;
    clean)
        clean
        ;;
    help|*)
        help
        ;;
esac