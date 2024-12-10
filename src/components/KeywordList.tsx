import React from 'react';
import { Copy, Check } from 'lucide-react';

interface KeywordListProps {
  keywords: string[];
}

export function KeywordList({ keywords }: KeywordListProps) {
  const [copied, setCopied] = React.useState(false);

  if (keywords.length === 0) return null;

  const handleCopy = async () => {
    const keywordText = keywords.join('\n');
    await navigator.clipboard.writeText(keywordText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mt-6 bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Generated Keywords</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy All</span>
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-2 font-mono text-sm">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
          >
            <span className="text-gray-400 w-6">{index + 1}.</span>
            <span className="text-gray-800">{keyword}</span>
          </div>
        ))}
      </div>
    </div>
  );
}