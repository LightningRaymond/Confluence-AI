export interface ConfluencePage {
  id: string;
  title: string;
  content: string;
  space: string;
  lastModified: string;
  url: string;
}

export interface SearchResult {
  page: ConfluencePage;
  similarity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  references?: SearchResult[];
}