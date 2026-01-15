
import React from 'react';

function FeedbackList({ feedback }) {
  return (
    <div className="card">
      <h2>Customer Feedback</h2>
      {(!feedback || feedback.length === 0) && (
        <p>No feedback yet for this product.</p>
      )}

      {feedback && feedback.map((item) => (
        <div key={item._id} className="feedback-item">
          <div className="feedback-header">
            <strong>Rating: {item.rating}</strong>
            <span className={`tag tag-${item.sentiment}`}>
              {item.sentiment}
            </span>
          </div>
          <p>{item.reviewText}</p>
          {item.themes && item.themes.length > 0 && (
            <p className="themes">
              Themes: {item.themes.join(', ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;
