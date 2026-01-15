// src/utils/themes.js
const themeKeywords = {
  Comfort: ['light', 'lightweight', 'heavy', 'fit', 'wearable', 'comfortable', 'uncomfortable', 'tight', 'loose'],
  Durability: ['broke', 'broken', 'strong', 'quality', 'fragile', 'sturdy', 'last', 'durable'],
  Appearance: ['shiny', 'dull', 'design', 'polish', 'beautiful', 'elegant', 'looks', 'pretty'],
};

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function detectThemes(reviewText) {
  const tokens = tokenize(reviewText);
  const themesHit = new Set();

  for (const [theme, keywords] of Object.entries(themeKeywords)) {
    for (const word of tokens) {
      if (keywords.includes(word)) {
        themesHit.add(theme);
        break; // one keyword is enough to mark the theme
      }
    }
  }

  return Array.from(themesHit);
}

module.exports = {
  detectThemes,
};
