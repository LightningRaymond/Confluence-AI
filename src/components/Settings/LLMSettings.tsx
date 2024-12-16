import React from 'react';
import { Config } from '../../types/config';

interface LLMSettingsProps {
  config: Config['llm'];
  onChange: (config: Config['llm']) => void;
}

export function LLMSettings({ config, onChange }: LLMSettingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">LLM Settings</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Model</label>
        <input
          type="text"
          value={config?.model || ''}
          onChange={(e) => onChange({ ...config, model: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Temperature</label>
        <input
          type="number"
          value={config?.temperature || 0.7}
          onChange={(e) => onChange({ ...config, temperature: parseFloat(e.target.value) || 0.7 })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          min="0"
          max="1"
          step="0.1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
        <input
          type="number"
          value={config?.maxTokens || 1024}
          onChange={(e) => onChange({ ...config, maxTokens: parseInt(e.target.value) || 1024 })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          min="1"
        />
      </div>
    </div>
  );
}