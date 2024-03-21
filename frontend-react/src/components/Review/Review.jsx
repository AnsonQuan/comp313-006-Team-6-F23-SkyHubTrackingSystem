
import React from 'react';
import './Review.css'; 

const Review = () => {
  return (
    <div className="review-container">
      <h2>Write a Review</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" name="rating" min="1" max="5" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" rows="5"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags:</label>
        <input type="text" id="tags" name="tags" placeholder="Separate tags with commas" />
      </div>
      <div className="form-group">
        <button className="submit-button">Submit Review</button>
      </div>
    </div>
  );
};

export default Review;
