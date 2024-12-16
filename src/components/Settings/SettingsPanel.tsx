import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Config, defaultConfig } from '../../types/config';
import { ConfluenceSettings } from './ConfluenceSettings';
import { LLMSettings } from './LLMSettings';

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/.bolt/config.json');
        if (response.ok) {
          const data = await response.json();
          setConfig({ ...defaultConfig, ...data });
        }
      } catch (error) {
        console.warn('Using default config:', error);
      }
    };

    loadConfig();
  }, []);

  const handleConfluenceChange = (confluenceConfig: Config['confluence']) => {
    setConfig(prev => ({
      ...prev,
      confluence: confluenceConfig,
    }));
  };

  const handleLLMChange = (llmConfig: Config['llm']) => {
    setConfig(prev => ({
      ...prev,
      llm: llmConfig,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/.bolt/config.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
      >
        <SettingsIcon size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              </div>

              <ConfluenceSettings
                config={config.confluence}
                onChange={handleConfluenceChange}
              />

              <div className="border-t border-gray-200 pt-6">
                <LLMSettings
                  config={config.llm}
                  onChange={handleLLMChange}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}