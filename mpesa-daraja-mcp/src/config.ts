/**
 * Configuration file for Daraja MCP Server
 * 
 * MODIFY THIS FILE to customize server behavior without touching core logic.
 * All configuration options are centralized here for easy maintenance.
 */

export const CONFIG = {
  // ============================================================================
  // SERVER CONFIGURATION
  // ============================================================================
  
  SERVER_NAME: "mpesa-daraja-mcp",
  SERVER_VERSION: "1.0.0",
  
  // ============================================================================
  // DOCUMENTATION PATHS
  // ============================================================================
  
  /**
   * Documentation search paths (in order of preference)
   * MODIFY: Add or reorder paths based on your project structure
   * 
   * Paths are relative to the compiled dist directory
   */
  DOC_SEARCH_PATHS: [
    "../../daraja_docs_v3",    // Standard relative path from dist
    "../daraja_docs_v3",       // Alternative relative path
    "daraja_docs_v3",          // Current working directory
    "../../../daraja_docs_v3"  // Deep nested structure
  ] as const,
  
  /**
   * Index file name
   * DO NOT CHANGE unless you modify the scraper output format
   */
  INDEX_FILE: "data_index.json" as const,
  
  // ============================================================================
  // SEARCH AND DISPLAY LIMITS
  // ============================================================================
  
  /** Maximum results for search operations */
  MAX_SEARCH_RESULTS: 50,
  
  /** Maximum lines to extract for API summaries */
  SUMMARY_MAX_LINES: 15,
  
  /** Section markers that indicate overview/description sections */
  OVERVIEW_SECTION_MARKERS: [
    "## Overview", 
    "# Overview", 
    "## Description",
    "## Summary"
  ] as const,
  
  // ============================================================================
  // API CATEGORIZATION
  // ============================================================================
  
  /**
   * API categorization mapping
   * MODIFY: Add new categories or reassign APIs to different categories
   * 
   * Categories help organize APIs for better discovery and navigation
   */
  API_CATEGORIES: {
    /** Core authentication and basic operations */
    core: [
      "Authorization", 
      "MpesaExpressSimulate", 
      "MpesaExpressQuery"
    ],
    
    /** Payment processing APIs */
    payments: [
      "CustomerToBusiness", 
      "BusinessToCustomer", 
      "BusinessPayBill", 
      "BusinessBuyGoods",
      "CustomerToBusinessRegisterURL"
    ],
    
    /** Transaction management and queries */
    transactions: [
      "TransactionStatus", 
      "AccountBalance", 
      "Reversal", 
      "PullTransaction"
    ],
    
    /** Business-to-business operations */
    business: [
      "B2BExpressCheckout", 
      "BusinessToPochi", 
      "TaxRemittance"
    ],
    
    /** Advanced features and utilities */
    advanced: [
      "DynamicQRCode", 
      "BillManager", 
      "MpesaRatiba"
    ],
    
    /** Specialized and niche APIs */
    specialized: [
      "IMSI", 
      "IotSimManagement", 
      "B2CAccountTopUp", 
      "Swap"
    ]
  } as const,
  
  // ============================================================================
  // ENDPOINT EXTRACTION
  // ============================================================================
  
  /**
   * Regex patterns for extracting API endpoints from documentation
   * MODIFY: Add new patterns to match different endpoint formats
   */
  ENDPOINT_PATTERNS: [
    /https:\/\/[^\s]+\.safaricom\.co\.ke[^\s]*/g,
    /https:\/\/[^\s]*daraja[^\s]*/g,
    /https:\/\/sandbox\.safaricom\.co\.ke[^\s]*/g,
    /https:\/\/api\.safaricom\.co\.ke[^\s]*/g
  ] as const,
  
  /** Maximum number of endpoints to extract per API */
  MAX_ENDPOINTS_PER_API: 5,
  
  // ============================================================================
  // COMPARISON FEATURES
  // ============================================================================
  
  /** Maximum number of APIs that can be compared at once */
  MAX_COMPARISON_APIS: 4,
  
  /** Maximum characters for overview in comparisons */
  COMPARISON_OVERVIEW_LENGTH: 200,
  
  /** Maximum endpoints to show in comparisons */
  COMPARISON_MAX_ENDPOINTS: 2,
  
  // ============================================================================
  // STATISTICS AND MONITORING
  // ============================================================================
  
  /** Enable usage statistics tracking */
  ENABLE_STATS: true,
  
  /** Number of top accessed APIs to show in statistics */
  STATS_TOP_APIS_COUNT: 5,
  
} as const;

/**
 * Type definitions derived from configuration
 * DO NOT MODIFY: These are automatically generated from the config above
 */
export type ApiCategory = keyof typeof CONFIG.API_CATEGORIES;
export type OverviewMarker = typeof CONFIG.OVERVIEW_SECTION_MARKERS[number];
export type DocSearchPath = typeof CONFIG.DOC_SEARCH_PATHS[number];

/**
 * Validation function for configuration
 * Ensures all required configuration values are present and valid
 */
export function validateConfig(): void {
  const requiredFields = [
    'SERVER_NAME',
    'SERVER_VERSION', 
    'DOC_SEARCH_PATHS',
    'INDEX_FILE',
    'API_CATEGORIES'
  ];
  
  for (const field of requiredFields) {
    if (!(field in CONFIG)) {
      throw new Error(`Missing required configuration field: ${field}`);
    }
  }
  
  // Validate search paths
  if (!Array.isArray(CONFIG.DOC_SEARCH_PATHS) || CONFIG.DOC_SEARCH_PATHS.length < 1) {
    throw new Error("DOC_SEARCH_PATHS must be a non-empty array");
  }
  
  // Validate API categories
  const totalApis = Object.values(CONFIG.API_CATEGORIES).flat().length;
  if (totalApis === 0) {
    throw new Error("API_CATEGORIES must contain at least one API");
  }
  
  console.error(`Configuration validated: ${totalApis} APIs across ${Object.keys(CONFIG.API_CATEGORIES).length} categories`);
}