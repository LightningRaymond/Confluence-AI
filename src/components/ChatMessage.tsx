import React from 'react';
import { SearchResult } from '../types';
import { ExternalLink } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  references?: SearchResult[];
}

export function ChatMessage({ role, content, references }: ChatMessageProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-3xl rounded-lg px-4 py-3 ${
        role === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="whitespace-pre-wrap">{content}</p>
        
        {references && references.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium mb-2">References:</p>
            <ul className="space-y-2">
              {references.map((ref, index) => (
                <li key={index} className="flex items-center text-sm">
                  <ExternalLink size={14} className="mr-2 flex-shrink-0" />
                  <a
                    href={ref.page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {ref.page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}