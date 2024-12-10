interface ScoringFactors {
  length: number;
  wordCount: number;
  frequency: number;
  capitalization: number;
}

export function calculatePhraseScore(phrase: string, frequency: number): number {
  const factors = analyzePhrase(phrase, frequency);
  
  // Weight factors
  const weights = {
    length: 0.2,      // Longer phrases get higher scores
    wordCount: 0.3,   // Multi-word phrases are preferred
    frequency: 0.3,   // More frequent phrases score higher
    capitalization: 0.2 // Originally capitalized phrases get a boost
  };
  
  return (
    factors.length * weights.length +
    factors.wordCount * weights.wordCount +
    factors.frequency * weights.frequency +
    factors.capitalization * weights.capitalization
  );
}

function analyzePhrase(phrase: string, frequency: number): ScoringFactors {
  const wordCount = phrase.split(' ').length;
  
  return {
    length: Math.min(phrase.length / 20, 1), // Normalize length score
    wordCount: wordCount / 3, // Normalize word count (max 3 words)
    frequency: Math.min(frequency / 5, 1), // Normalize frequency
    capitalization: 0.5 // Default capitalization score
  };
}