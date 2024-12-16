import fs from 'fs/promises';
import { Config, ConfigSchema, defaultConfig } from '../types/config';

const CONFIG_PATH = './.bolt/config.json';

export async function loadConfig(): Promise<Config> {
  try {
    const configFile = await fs.readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configFile);
    return ConfigSchema.parse({ ...defaultConfig, ...config });
  } catch (error) {
    return defaultConfig;
  }
}

export async function saveConfig(config: Config): Promise<void> {
  const validConfig = ConfigSchema.parse(config);
  await fs.writeFile(CONFIG_PATH, JSON.stringify(validConfig, null, 2));
}