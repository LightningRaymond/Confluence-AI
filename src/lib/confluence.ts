import fetch from 'node-fetch';
import { ConfluencePage } from '../types';
import { Config } from '../types/config';

export class ConfluenceClient {
  private baseUrl: string;
  private auth: string;

  constructor(config: Config['confluence']) {
    this.baseUrl = config.baseUrl;
    this.auth = Buffer.from(`${config.username}:${config.apiToken}`).toString('base64');
  }

  private async request(path: string) {
    const response = await fetch(`${this.baseUrl}/rest/api${path}`, {
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Confluence API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getPages(spaceKey: string, startAt = 0): Promise<ConfluencePage[]> {
    const result = await this.request(
      `/content?spaceKey=${spaceKey}&expand=body.storage&limit=50&start=${startAt}`
    );

    return result.results.map((page: any) => ({
      id: page.id,
      title: page.title,
      content: page.body.storage.value,
      space: spaceKey,
      lastModified: page.version.when,
      url: `${this.baseUrl}/pages/viewpage.action?pageId=${page.id}`,
    }));
  }

  async getAllPages(spaces: string[]): Promise<ConfluencePage[]> {
    const pages: ConfluencePage[] = [];
    
    for (const space of spaces) {
      let startAt = 0;
      let results: ConfluencePage[];
      
      do {
        results = await this.getPages(space, startAt);
        pages.push(...results);
        startAt += results.length;
      } while (results.length === 50);
    }

    return pages;
  }
}