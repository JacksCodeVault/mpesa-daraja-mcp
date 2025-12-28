// Simple test to verify the server can load documentation
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test documentation loading
const possiblePaths = [
  join(__dirname, "../daraja_docs_v3"),
  join(process.cwd(), "../daraja_docs_v3"),
  join(__dirname, "../../daraja_docs_v3")
];

console.log("🔍 Testing documentation paths...");

let foundPath = null;
for (const path of possiblePaths) {
  console.log(`   Checking: ${path}`);
  if (existsSync(join(path, "data_index.json"))) {
    foundPath = path;
    console.log(`   ✅ Found documentation at: ${path}`);
    break;
  } else {
    console.log(`   ❌ Not found`);
  }
}

if (foundPath) {
  try {
    const indexPath = join(foundPath, "data_index.json");
    const indexData = readFileSync(indexPath, "utf-8");
    const docs = JSON.parse(indexData);
    console.log(`📚 Successfully loaded ${docs.length} API documentation files`);
    console.log("   Available APIs:", docs.map(d => d.name).join(", "));
  } catch (error) {
    console.error("❌ Error loading documentation:", error.message);
  }
} else {
  console.error("❌ Could not find daraja_docs_v3 directory with data_index.json");
  console.log("   Make sure you've run the scraper first to generate the documentation.");
}