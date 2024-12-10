import { calculatePhraseScore } from './keywordScoring';

interface PhraseCount {
  phrase: string;
  count: number;
  score: number;
}

export function findPhrases(text: string): PhraseCount[] {
  // Convert text to lowercase and clean it
  const cleanText = text.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Split into sentences
  const sentences = cleanText.split(/[.!?]+/).filter(Boolean);
  
  // Find 1-3 word phrases
  const phraseMap = new Map<string, PhraseCount>();
  
  sentences.forEach(sentence => {
    const words = sentence.trim().split(' ');
    
    // Single words
    words.forEach(word => {
      if (isValidWord(word)) {
        updatePhraseCount(phraseMap, word);
      }
    });
    
    // Two-word phrases
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (isValidPhrase(phrase)) {
        updatePhraseCount(phraseMap, phrase);
      }
    }
    
    // Three-word phrases
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      if (isValidPhrase(phrase)) {
        updatePhraseCount(phraseMap, phrase);
      }
    }
  });
  
  return Array.from(phraseMap.values());
}

function isValidWord(word: string): boolean {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
    'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
    'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could',
    'may', 'might', 'must', 'can', 'that', 'this', 'these', 'those', 'it',
    'its', 'from', 'as', 'im', 'am', 'they', 'them', 'their', 'what', 'which',
    'who', 'whom', 'whose', 'when', 'where', 'why', 'how'
  ]);
  
  return word.length > 2 && !stopWords.has(word);
}

function isValidPhrase(phrase: string): boolean {
  const words = phrase.split(' ');
  return words.every(isValidWord) && !words.some(word => word.length < 3);
}

function updatePhraseCount(phraseMap: Map<string, PhraseCount>, phrase: string): void {
  const existing = phraseMap.get(phrase);
  if (existing) {
    existing.count++;
    existing.score = calculatePhraseScore(phrase, existing.count);
  } else {
    phraseMap.set(phrase, {
      phrase,
      count: 1,
      score: calculatePhraseScore(phrase, 1)
    });
  }
}