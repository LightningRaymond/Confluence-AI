import { pipeline } from '@xenova/transformers';
import { ConfluencePage } from '../types';

export class EmbeddingGenerator {
  private model: any;
  private modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  async init() {
    this.model = await pipeline('feature-extraction', this.modelName);
  }

  async generateEmbedding(text: string): Promise<Float32Array> {
    const result = await this.model(text, { pooling: 'mean', normalize: true });
    return result.data;
  }

  async processPage(page: ConfluencePage): Promise<Float32Array> {
    const text = `${page.title}\n\n${page.content}`;
    return this.generateEmbedding(text);
  }
}