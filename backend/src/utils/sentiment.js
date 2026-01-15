// src/utils/sentiment.js
const positiveWords = [
  'shiny',
  'elegant',
  'premium',
  'beautiful',
  'comfortable',
  'lightweight',
  'gorgeous',
  'love',
  'perfect',
  'stylish',
];

const negativeWords = [
  'tarnish',
  'dull',
  'heavy',
  'broke',
  'uncomfortable',
  'fragile',
  'cheap',
  'bad',
  'disappointed',
  'scratched',
];

// Helper: clean and split text
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // remove punctuation
    .split(/\s+/)
    .filter(Boolean);
}

// Main function: returns label + numeric score
function analyzeSentiment(reviewText) {
  const tokens = tokenize(reviewText);

  let positiveCount = 0;
  let negativeCount = 0;

  for (const word of tokens) {
    if (positiveWords.includes(word)) {
      positiveCount++;
    }
    if (negativeWords.includes(word)) {
      negativeCount++;
    }
  }

  const score = positiveCount - negativeCount; // simple scoring

  let label = 'neutral';
  if (score > 0) label = 'positive';
  else if (score < 0) label = 'negative';

  return { label, score };
}

module.exports = {
  analyzeSentiment,
};
