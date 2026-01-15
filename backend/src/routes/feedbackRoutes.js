// src/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();

const {
  createFeedback,
  getFeedbackByProduct,
  getAllFeedback,
  getSentimentSummary,
  getThemeSummary,
} = require('../controllers/feedbackController');

// More specific routes first (to avoid conflicts)
router.get('/:productId/sentiment-summary', getSentimentSummary);
router.get('/:productId/theme-summary', getThemeSummary);

// Core routes
router.post('/', createFeedback);
router.get('/', getAllFeedback);
router.get('/:productId', getFeedbackByProduct);

module.exports = router;

