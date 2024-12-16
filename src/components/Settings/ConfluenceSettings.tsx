import React from 'react';
import { Config } from '../../types/config';

interface ConfluenceSettingsProps {
  config: Config['confluence'];
  onChange: (config: Config['confluence']) => void;
}

export function ConfluenceSettings({ config, onChange }: ConfluenceSettingsProps) {
  const handleSpacesChange = (value: string) => {
    const spaces = value.split(',').map(s => s.trim()).filter(Boolean);
    onChange({ ...config, spaces });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Confluence Settings</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Base URL</label>
        <input
          type="url"
          value={config?.baseUrl || ''}
          onChange={(e) => onChange({ ...config, baseUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="https://your-domain.atlassian.net"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={config?.username || ''}
          onChange={(e) => onChange({ ...config, username: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">API Token</label>
        <input
          type="password"
          value={config?.apiToken || ''}
          onChange={(e) => onChange({ ...config, apiToken: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Space Keys</label>
        <input
          type="text"
          value={config?.spaces?.join(', ') || ''}
          onChange={(e) => handleSpacesChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="SPACE1, SPACE2, SPACE3"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Sync Interval (minutes)</label>
        <input
          type="number"
          value={config?.syncInterval || 60}
          onChange={(e) => onChange({ ...config, syncInterval: parseInt(e.target.value) || 60 })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          min="1"
        />
      </div>
    </div>
  );
}