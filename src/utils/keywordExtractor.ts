import { findPhrases } from './phraseDetector';
import { calculatePhraseScore } from './keywordScoring';

export function extractKeywords(text: string): string[] {
  // Early return for empty text
  if (!text.trim()) {
    return [];
  }

  // Find phrases and their initial scores
  const phrases = findPhrases(text);
  
  // Additional scoring based on context
  const enhancedPhrases = phrases.map(phrase => ({
    ...phrase,
    score: calculatePhraseScore(phrase.phrase, phrase.count)
  }));
  
  // Sort by score and extract top 20 phrases
  const topPhrases = enhancedPhrases
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ phrase }) => {
      // Capitalize first letter of each word
      return phrase
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });
  
  return topPhrases;
}