import { z } from 'zod';

export const ConfigSchema = z.object({
  confluence: z.object({
    baseUrl: z.string().url(),
    username: z.string(),
    apiToken: z.string(),
    spaces: z.array(z.string()),
    syncInterval: z.number().min(1),
  }),
  llm: z.object({
    model: z.string(),
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().min(1),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

export const defaultConfig: Config = {
  confluence: {
    baseUrl: '',
    username: '',
    apiToken: '',
    spaces: [],
    syncInterval: 60,
  },
  llm: {
    model: 'Xenova/all-MiniLM-L6-v2',
    temperature: 0.7,
    maxTokens: 1024,
  },
};