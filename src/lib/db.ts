import Database from 'better-sqlite3';
import { ConfluencePage } from '../types';

const db = new Database('confluence.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    space TEXT NOT NULL,
    last_modified TEXT NOT NULL,
    url TEXT NOT NULL,
    embedding BLOB
  )
`);

export const insertPage = (page: ConfluencePage, embedding?: Float32Array) => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO pages (id, title, content, space, last_modified, url, embedding)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    page.id,
    page.title,
    page.content,
    page.space,
    page.lastModified,
    page.url,
    embedding ? Buffer.from(embedding.buffer) : null
  );
};

export const getPages = () => {
  return db.prepare('SELECT * FROM pages').all() as ConfluencePage[];
};

export const searchPages = (embedding: Float32Array, limit = 5) => {
  // Simplified cosine similarity search
  const pages = getPages();
  return pages
    .map(page => ({
      page,
      similarity: cosineSimilarity(embedding, new Float32Array(page.embedding as Buffer))
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
};

function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}