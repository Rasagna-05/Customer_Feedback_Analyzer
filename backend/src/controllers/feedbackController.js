// src/controllers/feedbackController.js
const Feedback = require('../models/Feedback');
const { analyzeSentiment } = require('../utils/sentiment');
const { detectThemes } = require('../utils/themes');

// POST /api/feedback
const createFeedback = async (req, res) => {
  try {
    const { productId, rating, reviewText } = req.body;

    if (!productId || !rating || !reviewText) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { label: sentiment, score: sentimentScore } = analyzeSentiment(reviewText);
    const themes = detectThemes(reviewText);

    const feedback = await Feedback.create({
      productId,
      rating,
      reviewText,
      sentiment,
      sentimentScore,
      themes,
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error('Error creating feedback:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error('Error getting all feedback:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/feedback/:productId
const getFeedbackByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const feedback = await Feedback.find({ productId }).sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error('Error getting feedback by product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/feedback/:productId/sentiment-summary
const getSentimentSummary = async (req, res) => {
  try {
    const { productId } = req.params;

    const agg = await Feedback.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: '$sentiment',
          count: { $sum: 1 },
        },
      },
    ]);

    let positive = 0;
    let negative = 0;
    let neutral = 0;
    let total = 0;

    agg.forEach((item) => {
      if (item._id === 'positive') positive = item.count;
      if (item._id === 'negative') negative = item.count;
      if (item._id === 'neutral') neutral = item.count;
      total += item.count;
    });

    res.json({ productId, total, positive, negative, neutral });
  } catch (err) {
    console.error('Error getting sentiment summary:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/feedback/:productId/theme-summary
const getThemeSummary = async (req, res) => {
  try {
    const { productId } = req.params;

    const agg = await Feedback.aggregate([
      { $match: { productId } },
      { $unwind: '$themes' },
      {
        $group: {
          _id: '$themes',
          count: { $sum: 1 },
        },
      },
    ]);

    const themeCounts = {};
    agg.forEach((item) => {
      themeCounts[item._id] = item.count;
    });

    res.json({ productId, themes: themeCounts });
  } catch (err) {
    console.error('Error getting theme summary:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackByProduct,
  getSentimentSummary,
  getThemeSummary,
};
