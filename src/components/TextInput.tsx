import React from 'react';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

export function TextInput({ text, setText }: TextInputProps) {
  return (
    <div className="w-full max-w-2xl">
      <textarea
        className="w-full h-40 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-2 text-sm text-gray-500">
        {text.length} characters • {text.split(/\s+/).filter(Boolean).length} words
      </div>
    </div>
  );
}