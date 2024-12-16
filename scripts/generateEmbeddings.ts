import { loadConfig } from '../src/lib/config';
import { EmbeddingGenerator } from '../src/lib/embeddings';
import { getPages, insertPage } from '../src/lib/db';

async function main() {
  try {
    const config = await loadConfig();
    const generator = new EmbeddingGenerator(config.llm.model);
    
    console.log('Initializing embedding model...');
    await generator.init();
    
    const pages = getPages();
    console.log(`Processing ${pages.length} pages...`);
    
    for (const page of pages) {
      const embedding = await generator.processPage(page);
      insertPage(page, embedding);
      console.log(`Generated embedding for: ${page.title}`);
    }
    
    console.log('Embedding generation completed successfully');
  } catch (error) {
    console.error('Error generating embeddings:', error);
    process.exit(1);
  }
}