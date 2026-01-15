
import React, { useState } from 'react';
import { createFeedback } from '../services/api';
import StarRating from './StarRating';

function FeedbackForm({ productId, onFeedbackAdded }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !reviewText) {
      setMessage('Please select a product and write a review.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      await createFeedback({
        productId,
        rating: Number(rating),
        reviewText,
      });
      setMessage('Feedback submitted!');
      setReviewText('');
      setRating(5);
      onFeedbackAdded && onFeedbackAdded();
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Rate & Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Selected Product</label>
          <input type="text" value={productId || ''} disabled />
        </div>

        <div className="form-group">
          <label>Your Rating</label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div className="form-group">
          <label>Your Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            placeholder="Tell us what you liked or didn’t like..."
          />
        </div>

        <button type="submit" disabled={submitting || !productId}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>

        {message && <p className="info">{message}</p>}
      </form>
    </div>
  );
}

export default FeedbackForm;
