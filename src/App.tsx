import React, { useState } from 'react';
import { TextInput } from './components/TextInput';
import { KeywordList } from './components/KeywordList';
import { extractKeywords } from './utils/keywordExtractor';
import { Sparkles } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleGenerateKeywords = () => {
    if (text.trim()) {
      const extractedKeywords = extractKeywords(text);
      setKeywords(extractedKeywords);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Keyword Generator
          </h1>
          <p className="text-gray-600">
            Extract the most important keywords from your text
          </p>
        </div>

        <div className="space-y-6">
          <TextInput text={text} setText={setText} />
          
          <button
            onClick={handleGenerateKeywords}
            disabled={!text.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles size={20} />
            Generate Keywords
          </button>

          <KeywordList keywords={keywords} />
        </div>
      </div>
    </div>
  );
}

export default App;