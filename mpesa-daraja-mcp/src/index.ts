import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Types for our documentation data
interface ApiDoc {
  name: string;
  url: string;
  local_path: string;
  description: string;
}

interface DarajaDocumentationService {
  docs: ApiDoc[];
  docsPath: string;
}

class DarajaDocumentationService {
  constructor() {
    // Look for the scraped data in the parent directory
    const possiblePaths = [
      join(__dirname, "../../daraja_docs_v3"),
      join(process.cwd(), "daraja_docs_v3"),
      join(__dirname, "../../../daraja_docs_v3")
    ];

    let foundPath = null;
    for (const path of possiblePaths) {
      if (existsSync(join(path, "data_index.json"))) {
        foundPath = path;
        break;
      }
    }

    if (!foundPath) {
      throw new Error("Could not find daraja_docs_v3 directory with data_index.json");
    }

    this.docsPath = foundPath;
    this.loadDocumentation();
  }

  private loadDocumentation(): void {
    try {
      const indexPath = join(this.docsPath, "data_index.json");
      const indexData = readFileSync(indexPath, "utf-8");
      this.docs = JSON.parse(indexData);
      console.error(`📚 Loaded ${this.docs.length} Daraja API documentation files`);
    } catch (error) {
      throw new Error(`Failed to load documentation index: ${error}`);
    }
  }

  searchApis(query?: string): ApiDoc[] {
    if (!query) {
      return this.docs;
    }

    const searchTerm = query.toLowerCase();
    return this.docs.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm) ||
      doc.description.toLowerCase().includes(searchTerm)
    );
  }

  getApiDoc(apiName: string): string | null {
    const doc = this.docs.find(d => 
      d.name.toLowerCase() === apiName.toLowerCase()
    );

    if (!doc) {
      return null;
    }

    try {
      const docPath = join(this.docsPath, doc.local_path);
      return readFileSync(docPath, "utf-8");
    } catch (error) {
      console.error(`Error reading doc ${apiName}:`, error);
      return null;
    }
  }

  listAllApis(): string[] {
    return this.docs.map(doc => doc.name);
  }
}

// Initialize the documentation service
const docService = new DarajaDocumentationService();

// Create the MCP server
const server = new McpServer({
  name: "mpesa-daraja-mcp",
  version: "1.0.0",
});

// Tool: Search Daraja APIs
server.tool(
  "search_daraja_apis",
  {
    query: z.string().optional().describe("Search term to filter APIs (optional)")
  },
  async ({ query }) => {
    const results = docService.searchApis(query);
    
    const resultText = results.length > 0 
      ? `Found ${results.length} APIs:\n\n` + 
        results.map(doc => `• **${doc.name}**: ${doc.description}`).join('\n')
      : "No APIs found matching your search.";

    return {
      content: [{ 
        type: "text", 
        text: resultText
      }]
    };
  }
);

// Tool: Get specific API documentation
server.tool(
  "get_daraja_api_doc",
  {
    api_name: z.string().describe("Name of the API to retrieve documentation for")
  },
  async ({ api_name }) => {
    const doc = docService.getApiDoc(api_name);
    
    if (!doc) {
      const availableApis = docService.listAllApis();
      return {
        content: [{ 
          type: "text", 
          text: `API "${api_name}" not found. Available APIs:\n${availableApis.join(', ')}`
        }]
      };
    }

    return {
      content: [{ 
        type: "text", 
        text: doc
      }]
    };
  }
);

// Tool: List all available APIs
server.tool(
  "list_daraja_apis",
  {},
  async () => {
    const apis = docService.listAllApis();
    
    return {
      content: [{ 
        type: "text", 
        text: `Available Daraja APIs (${apis.length} total):\n\n${apis.map(api => `• ${api}`).join('\n')}`
      }]
    };
  }
);

// Tool: Get API summary with key endpoints
server.tool(
  "get_api_summary",
  {
    api_name: z.string().describe("Name of the API to summarize")
  },
  async ({ api_name }) => {
    const doc = docService.getApiDoc(api_name);
    
    if (!doc) {
      return {
        content: [{ 
          type: "text", 
          text: `API "${api_name}" not found.`
        }]
      };
    }

    // Extract key information from the documentation
    const lines = doc.split('\n');
    const summary = [];
    let inOverview = false;
    let inEndpoint = false;
    
    for (const line of lines) {
      if (line.includes('## Overview') || line.includes('# Overview')) {
        inOverview = true;
        continue;
      }
      if (line.startsWith('##') && inOverview) {
        inOverview = false;
      }
      if (inOverview && line.trim()) {
        summary.push(line);
      }
      
      // Look for endpoint URLs
      if (line.includes('https://') && (line.includes('safaricom') || line.includes('daraja'))) {
        summary.push(`\n**Endpoint:** ${line.trim()}`);
      }
    }

    const summaryText = summary.length > 0 
      ? summary.slice(0, 10).join('\n') 
      : "No summary available. Use get_daraja_api_doc for full documentation.";

    return {
      content: [{ 
        type: "text", 
        text: `## ${api_name} Summary\n\n${summaryText}\n\n*Use get_daraja_api_doc for complete documentation.*`
      }]
    };
  }
);

// Start the server
async function main() {
  console.error("🚀 Starting Mpesa Daraja MCP Server...");
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("✅ Server connected and ready!");
}

main().catch((error) => {
  console.error("❌ Server failed to start:", error);
  process.exit(1);
});