
import React from 'react';

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <div className="star-rating">
      {stars.map((star) => {
        const filled = star <= value;
        const highRating = value >= 3 && filled; // bounce if rating >= 3

        return (
          <button
            key={`${star}-${value}`} // forces remount on change → re-triggers animation
            type="button"
            className={`star ${filled ? 'filled' : ''} ${
              highRating ? 'bounce' : ''
            }`}
            onClick={() => handleClick(star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
