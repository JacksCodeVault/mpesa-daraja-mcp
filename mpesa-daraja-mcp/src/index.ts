/**
 * Daraja API Documentation MCP Server
 * 
 * A Model Context Protocol server that provides AI assistants with access to
 * comprehensive Safaricom Daraja API documentation. This server offers tools
 * for searching, retrieving, and summarizing API documentation.
 * 
 * Features:
 * - Advanced API search with categorization
 * - Complete API documentation retrieval
 * - Enhanced API summaries with endpoints
 * - Category-based API listing
 * - Server usage statistics
 * - Multi-API comparison tools
 * 
 * @author Daraja Documentation Team
 * @license MIT
 * @version 1.0.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { CONFIG, validateConfig, type ApiCategory } from "./config.js";

// Validate configuration on startup
validateConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
// CORE TYPES - DO NOT MODIFY UNLESS CHANGING SCRAPER OUTPUT FORMAT
// ============================================================================

/**
 * Interface for API documentation metadata
 * DO NOT MODIFY: This must match the scraper output format
 */
interface ApiDoc {
  readonly name: string;
  readonly url: string;
  readonly local_path: string;
  readonly description: string;
}

/**
 * Extended API information with categorization
 */
interface ExtendedApiDoc extends ApiDoc {
  readonly category: string;
  readonly endpoints: string[];
  readonly lastAccessed?: Date;
}

/**
 * Server usage statistics
 */
interface UsageStats {
  totalRequests: number;
  apiAccessCount: Map<string, number>;
  lastReset: Date;
}

// ============================================================================
// DOCUMENTATION SERVICE - MODIFY WITH CAUTION
// ============================================================================

/**
 * Daraja API Documentation Service
 * 
 * Provides access to scraped Safaricom Daraja API documentation through
 * a structured interface for MCP server consumption.
 * 
 * CORE SERVICE - MODIFY WITH CAUTION
 */
class DarajaDocumentationService {
  private readonly docs: ApiDoc[] = [];
  private readonly extendedDocs: Map<string, ExtendedApiDoc> = new Map();
  private readonly docsPath: string;
  private readonly stats: UsageStats;

  constructor() {
    // DO NOT MODIFY: Core path resolution logic
    const searchPaths = CONFIG.DOC_SEARCH_PATHS.map(relativePath => 
      join(__dirname, relativePath)
    );
    
    // Add current working directory path
    searchPaths.push(join(process.cwd(), "daraja_docs_v3"));

    let foundPath: string | null = null;
    for (const searchPath of searchPaths) {
      if (existsSync(join(searchPath, CONFIG.INDEX_FILE))) {
        foundPath = searchPath;
        break;
      }
    }

    if (!foundPath) {
      throw new Error(
        `Could not find documentation directory with ${CONFIG.INDEX_FILE}. ` +
        `Searched paths: ${searchPaths.join(", ")}`
      );
    }

    this.docsPath = foundPath;
    this.stats = {
      totalRequests: 0,
      apiAccessCount: new Map(),
      lastReset: new Date()
    };
    
    this.loadDocumentation();
    this.categorizeApis();
  }

  /**
   * Load documentation index from the scraped data directory
   * DO NOT MODIFY: Core loading logic
   */
  private loadDocumentation(): void {
    try {
      const indexPath = join(this.docsPath, CONFIG.INDEX_FILE);
      const indexData = readFileSync(indexPath, "utf-8");
      const loadedDocs = JSON.parse(indexData) as ApiDoc[];
      
      // Validate loaded data structure
      for (const doc of loadedDocs) {
        if (!doc.name || !doc.url || !doc.local_path || !doc.description) {
          throw new Error(`Invalid document structure: ${JSON.stringify(doc)}`);
        }
      }
      
      this.docs.push(...loadedDocs);
      console.error(`Loaded ${this.docs.length} Daraja API documentation files from ${this.docsPath}`);
    } catch (error) {
      throw new Error(`Failed to load documentation index: ${error}`);
    }
  }

  /**
   * Categorize APIs based on configuration
   * MODIFY: Update CONFIG.API_CATEGORIES to change categorization
   */
  private categorizeApis(): void {
    for (const doc of this.docs) {
      let category = "other";
      
      // Find category for this API
      for (const [categoryName, apiNames] of Object.entries(CONFIG.API_CATEGORIES)) {
        if ((apiNames as readonly string[]).includes(doc.name)) {
          category = categoryName;
          break;
        }
      }

      // Extract endpoints from documentation
      const endpoints = this.extractEndpoints(doc);
      
      const extendedDoc: ExtendedApiDoc = {
        ...doc,
        category,
        endpoints
      };
      
      this.extendedDocs.set(doc.name.toLowerCase(), extendedDoc);
    }
  }

  /**
   * Extract API endpoints from documentation content
   * MODIFY: Adjust regex patterns in CONFIG.ENDPOINT_PATTERNS
   */
  private extractEndpoints(doc: ApiDoc): string[] {
    try {
      const docPath = join(this.docsPath, doc.local_path);
      const content = readFileSync(docPath, "utf-8");
      
      const endpoints = new Set<string>();
      
      for (const pattern of CONFIG.ENDPOINT_PATTERNS) {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            // Clean up the match
            const cleaned = match.replace(/[^\w\-.:\/]/g, '').trim();
            if (cleaned.startsWith('http')) {
              endpoints.add(cleaned);
            }
          });
        }
      }
      
      return Array.from(endpoints).slice(0, CONFIG.MAX_ENDPOINTS_PER_API);
    } catch (error) {
      console.error(`Error extracting endpoints for ${doc.name}:`, error);
      return [];
    }
  }

  /**
   * Update usage statistics
   * MODIFY: Add additional metrics as needed
   */
  private updateStats(apiName?: string): void {
    if (!CONFIG.ENABLE_STATS) return;
    
    this.stats.totalRequests++;
    
    if (apiName) {
      const currentCount = this.stats.apiAccessCount.get(apiName) || 0;
      this.stats.apiAccessCount.set(apiName, currentCount + 1);
      
      // Update last accessed time
      const extendedDoc = this.extendedDocs.get(apiName.toLowerCase());
      if (extendedDoc) {
        (extendedDoc as any).lastAccessed = new Date();
      }
    }
  }

  /**
   * Search APIs by name, description, or category
   * MODIFY: Add additional search criteria as needed
   */
  searchApis(query?: string, category?: string, limit?: number): ExtendedApiDoc[] {
    this.updateStats();
    
    let results = Array.from(this.extendedDocs.values());
    
    // Filter by category if specified
    if (category) {
      results = results.filter(doc => doc.category === category.toLowerCase());
    }
    
    // Filter by search query if specified
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm) ||
        doc.description.toLowerCase().includes(searchTerm) ||
        doc.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply limit
    const maxResults = limit || CONFIG.MAX_SEARCH_RESULTS;
    return results.slice(0, maxResults);
  }

  /**
   * Get complete documentation for a specific API
   * DO NOT MODIFY: Core retrieval logic
   */
  getApiDoc(apiName: string): string | null {
    this.updateStats(apiName);
    
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
      console.error(`Error reading documentation for ${apiName}:`, error);
      return null;
    }
  }

  /**
   * Get list of all available API names
   */
  listAllApis(): string[] {
    this.updateStats();
    return this.docs.map(doc => doc.name);
  }

  /**
   * Get APIs by category
   * MODIFY: Add new categories in CONFIG.API_CATEGORIES
   */
  getApisByCategory(category: string): ExtendedApiDoc[] {
    this.updateStats();
    return Array.from(this.extendedDocs.values())
      .filter(doc => doc.category === category.toLowerCase());
  }

  /**
   * Get available categories
   */
  getCategories(): string[] {
    return Object.keys(CONFIG.API_CATEGORIES);
  }

  /**
   * Get server usage statistics
   */
  getUsageStats(): UsageStats {
    return {
      ...this.stats,
      apiAccessCount: new Map(this.stats.apiAccessCount)
    };
  }

  /**
   * Reset usage statistics
   */
  resetStats(): void {
    this.stats.totalRequests = 0;
    this.stats.apiAccessCount.clear();
    this.stats.lastReset = new Date();
  }

  /**
   * Get documentation path (for debugging)
   */
  getDocsPath(): string {
    return this.docsPath;
  }
}

// ============================================================================
// SERVICE INITIALIZATION - DO NOT MODIFY
// ============================================================================

const docService = new DarajaDocumentationService();

// ============================================================================
// MCP SERVER SETUP - MODIFY TOOL DEFINITIONS AS NEEDED
// ============================================================================

const server = new McpServer({
  name: CONFIG.SERVER_NAME,
  version: CONFIG.SERVER_VERSION,
});

// ============================================================================
// MCP TOOLS - ADD NEW TOOLS HERE
// ============================================================================

/**
 * Tool: Advanced API Search
 * MODIFY: Add new search parameters as needed
 */
server.tool(
  "search_daraja_apis",
  {
    query: z.string().optional().describe("Search term to filter APIs by name, description, or category"),
    category: z.string().optional().describe("Filter by API category (core, payments, transactions, business, advanced, specialized)"),
    limit: z.number().optional().describe("Maximum number of results to return (default: 10)")
  },
  async ({ query, category, limit = 10 }) => {
    const results = docService.searchApis(query, category, limit);
    
    if (results.length === 0) {
      const availableCategories = docService.getCategories();
      return {
        content: [{ 
          type: "text", 
          text: `No APIs found matching your criteria.\n\nAvailable categories: ${availableCategories.join(", ")}\n\nTry searching without filters or use a different category.`
        }]
      };
    }

    const resultText = `Found ${results.length} APIs:\n\n` + 
      results.map(doc => {
        const endpointInfo = doc.endpoints.length > 0 
          ? `\n  Endpoints: ${doc.endpoints.slice(0, 2).join(", ")}${doc.endpoints.length > 2 ? "..." : ""}`
          : "";
        return `• **${doc.name}** (${doc.category}): ${doc.description}${endpointInfo}`;
      }).join('\n\n');

    return {
      content: [{ 
        type: "text", 
        text: resultText
      }]
    };
  }
);

/**
 * Tool: Get Complete API Documentation
 * DO NOT MODIFY: Core functionality
 */
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
          text: `API "${api_name}" not found.\n\nAvailable APIs:\n${availableApis.join(", ")}\n\nUse search_daraja_apis to find APIs by category or keyword.`
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

/**
 * Tool: List APIs by Category
 * MODIFY: Add new categories in CONFIG.API_CATEGORIES
 */
server.tool(
  "list_apis_by_category",
  {
    category: z.string().optional().describe("Category to filter by (core, payments, transactions, business, advanced, specialized)")
  },
  async ({ category }) => {
    if (category) {
      const categoryApis = docService.getApisByCategory(category);
      if (categoryApis.length === 0) {
        const availableCategories = docService.getCategories();
        return {
          content: [{ 
            type: "text", 
            text: `No APIs found in category "${category}".\n\nAvailable categories: ${availableCategories.join(", ")}`
          }]
        };
      }
      
      const resultText = `APIs in "${category}" category (${categoryApis.length} total):\n\n` +
        categoryApis.map(api => `• **${api.name}**: ${api.description}`).join('\n');
      
      return {
        content: [{ 
          type: "text", 
          text: resultText
        }]
      };
    } else {
      // List all categories with counts
      const categories = docService.getCategories();
      const categoryInfo = categories.map(cat => {
        const count = docService.getApisByCategory(cat).length;
        return `• **${cat}**: ${count} APIs`;
      }).join('\n');
      
      return {
        content: [{ 
          type: "text", 
          text: `Available API Categories:\n\n${categoryInfo}\n\nUse this tool with a specific category to see APIs in that category.`
        }]
      };
    }
  }
);

/**
 * Tool: Get Enhanced API Summary
 * MODIFY: Adjust summary extraction logic in CONFIG
 */
server.tool(
  "get_api_summary",
  {
    api_name: z.string().describe("Name of the API to summarize"),
    include_endpoints: z.boolean().optional().describe("Include endpoint URLs in summary (default: true)")
  },
  async ({ api_name, include_endpoints = true }) => {
    const doc = docService.getApiDoc(api_name);
    
    if (!doc) {
      return {
        content: [{ 
          type: "text", 
          text: `API "${api_name}" not found. Use search_daraja_apis to find available APIs.`
        }]
      };
    }

    // Extract key information from the documentation
    const lines = doc.split('\n');
    const summary = [];
    let inOverview = false;
    
    for (const line of lines) {
      // Check for overview section markers
      if (CONFIG.OVERVIEW_SECTION_MARKERS.some(marker => line.includes(marker))) {
        inOverview = true;
        continue;
      }
      if (line.startsWith('##') && inOverview) {
        inOverview = false;
      }
      if (inOverview && line.trim()) {
        summary.push(line);
      }
      
      // Stop if we have enough content
      if (summary.length >= CONFIG.SUMMARY_MAX_LINES) {
        break;
      }
    }

    let summaryText = summary.length > 0 
      ? summary.join('\n') 
      : "No overview section found in documentation.";

    // Add endpoint information if requested
    if (include_endpoints) {
      const endpoints = [];
      for (const pattern of CONFIG.ENDPOINT_PATTERNS) {
        const matches = doc.match(pattern);
        if (matches) {
          const uniqueEndpoints = [...new Set(matches)].slice(0, 3);
          if (uniqueEndpoints.length > 0) {
            endpoints.push("\n\n**Key Endpoints:**");
            endpoints.push(...uniqueEndpoints.map(endpoint => `• ${endpoint}`));
            break; // Only use first pattern that matches
          }
        }
      }
      
      summaryText += endpoints.join('\n');
    }

    return {
      content: [{ 
        type: "text", 
        text: `## ${api_name} Summary\n\n${summaryText}\n\n*Use get_daraja_api_doc for complete documentation.*`
      }]
    };
  }
);

/**
 * Tool: Get Server Statistics
 * MODIFY: Add new metrics as needed
 */
server.tool(
  "get_server_stats",
  {},
  async () => {
    const stats = docService.getUsageStats();
    const totalApis = docService.listAllApis().length;
    
    // Get most accessed APIs
    const sortedAccess = Array.from(stats.apiAccessCount.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, CONFIG.STATS_TOP_APIS_COUNT);
    
    const mostAccessedText = sortedAccess.length > 0
      ? sortedAccess.map(([api, count]) => `• ${api}: ${count} requests`).join('\n')
      : "No API access recorded yet";

    const statsText = [
      `**Server Statistics**`,
      ``,
      `• Total APIs Available: ${totalApis}`,
      `• Total Requests: ${stats.totalRequests}`,
      `• Statistics Since: ${stats.lastReset.toISOString()}`,
      ``,
      `**Most Accessed APIs:**`,
      mostAccessedText,
      ``,
      `**Available Categories:**`,
      docService.getCategories().map(cat => `• ${cat}`).join('\n')
    ].join('\n');

    return {
      content: [{ 
        type: "text", 
        text: statsText
      }]
    };
  }
);

/**
 * Tool: Compare APIs
 * NEW FEATURE: Compare multiple APIs side by side
 */
server.tool(
  "compare_apis",
  {
    api_names: z.array(z.string()).describe("Array of API names to compare (2-4 APIs recommended)"),
    comparison_aspects: z.array(z.string()).optional().describe("Specific aspects to compare (endpoints, authentication, parameters)")
  },
  async ({ api_names, comparison_aspects = ["overview", "endpoints"] }) => {
    if (api_names.length < 2) {
      return {
        content: [{ 
          type: "text", 
          text: "Please provide at least 2 APIs to compare."
        }]
      };
    }

    if (api_names.length > CONFIG.MAX_COMPARISON_APIS) {
      return {
        content: [{ 
          type: "text", 
          text: `Please limit comparison to ${CONFIG.MAX_COMPARISON_APIS} APIs maximum for readability.`
        }]
      };
    }

    const comparisons = [];
    
    for (const apiName of api_names) {
      const doc = docService.getApiDoc(apiName);
      if (!doc) {
        comparisons.push(`**${apiName}**: Not found`);
        continue;
      }

      const lines = doc.split('\n');
      let overview = "No overview available";

      // Extract overview
      let inOverview = false;
      const overviewLines = [];
      for (const line of lines) {
        if (CONFIG.OVERVIEW_SECTION_MARKERS.some(marker => line.includes(marker))) {
          inOverview = true;
          continue;
        }
        if (line.startsWith('##') && inOverview) break;
        if (inOverview && line.trim()) {
          overviewLines.push(line);
          if (overviewLines.length >= 3) break; // Limit for comparison
        }
      }
      if (overviewLines.length > 0) {
        overview = overviewLines.join(' ').substring(0, CONFIG.COMPARISON_OVERVIEW_LENGTH) + "...";
      }

      // Extract endpoints
      let endpoints: string[] = [];
      for (const pattern of CONFIG.ENDPOINT_PATTERNS) {
        const endpointMatches = doc.match(pattern);
        if (endpointMatches) {
          endpoints = [...new Set(endpointMatches)].slice(0, CONFIG.COMPARISON_MAX_ENDPOINTS);
          break;
        }
      }

      comparisons.push([
        `**${apiName}**`,
        `Overview: ${overview}`,
        `Endpoints: ${endpoints.length > 0 ? endpoints.join(", ") : "None found"}`,
        ""
      ].join('\n'));
    }

    return {
      content: [{ 
        type: "text", 
        text: `## API Comparison\n\n${comparisons.join('\n---\n\n')}`
      }]
    };
  }
);

// ============================================================================
// SERVER STARTUP - DO NOT MODIFY UNLESS CHANGING TRANSPORT
// ============================================================================

/**
 * Initialize and start the MCP server
 * DO NOT MODIFY: Core server initialization
 */
async function main(): Promise<void> {
  try {
    console.error(`Starting ${CONFIG.SERVER_NAME} v${CONFIG.SERVER_VERSION}...`);
    console.error(`Documentation loaded from: ${docService.getDocsPath()}`);
    
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error("Server connected and ready for requests");
    console.error(`Available tools: search_daraja_apis, get_daraja_api_doc, list_apis_by_category, get_api_summary, get_server_stats, compare_apis`);
  } catch (error) {
    console.error("Failed to start server:", error);
    throw error;
  }
}

// Start the server
main().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});