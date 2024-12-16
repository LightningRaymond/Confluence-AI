import { loadConfig } from '../src/lib/config';
import { ConfluenceClient } from '../src/lib/confluence';
import { insertPage } from '../src/lib/db';

async function main() {
  try {
    const config = await loadConfig();
    const client = new ConfluenceClient(config.confluence);
    
    console.log('Fetching pages from Confluence...');
    const pages = await client.getAllPages(config.confluence.spaces);
    
    console.log(`Found ${pages.length} pages`);
    for (const page of pages) {
      insertPage(page);
    }
    
    console.log('Data fetch completed successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
    process.exit(1);
  }
}