// src/utils/insightGenerator.js

export function generateInsights(sentimentSummary, themeSummary, feedbackList) {

  if (!sentimentSummary || !themeSummary || !feedbackList) {
    return "Not enough data to generate insights yet.";
  }

  const total = sentimentSummary.total || 0;
  const pos = sentimentSummary.positive || 0;
  const neg = sentimentSummary.negative || 0;
  const neu = sentimentSummary.neutral || 0;

  const themes = themeSummary.themes || {};

  let strongestTheme = null;
  let strongestThemeCount = 0;

  Object.entries(themes).forEach(([theme, count]) => {
    if (count > strongestThemeCount) {
      strongestTheme = theme;
      strongestThemeCount = count;
    }
  });

  // Build insight paragraphs
  let insightText = `Based on ${total} customer feedback entries:`;

  insightText += ` ${pos} reviews were positive, ${neg} were negative, and ${neu} were neutral.`;

  if (pos > neg) {
    insightText += ` Customers are generally satisfied with this product.`;
  } else if (neg > pos) {
    insightText += ` Improvement is needed as it received more negative feedback.`;
  }

  if (strongestTheme) {
    insightText += ` The most commonly mentioned theme is ${strongestTheme}, appearing in ${strongestThemeCount} reviews.`;
  }

  // Optional: add common keywords
  const allWords = feedbackList
    .map(f => f.reviewText.toLowerCase())
    .join(" ")
    .split(/\W+/)
    .filter(w => w.length > 4);

  const wordCounts = {};
  allWords.forEach(w => {
    wordCounts[w] = (wordCounts[w] || 0) + 1;
  });

  let topWord = null;
  let topWordCount = 0;

  for (let [word, count] of Object.entries(wordCounts)) {
    if (count > topWordCount) {
      topWord = word;
      topWordCount = count;
    }
  }

  // if (topWord) {
  //   insightText += ` Customers frequently use the word "${topWord}", which may indicate a strong sentiment or a recurring focus.\n`;
  // }
  if(total==0){
    insightText = "Not enough data to generate insights yet.";
  }


  return insightText;
}
