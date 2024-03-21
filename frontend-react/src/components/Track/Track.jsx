import React from 'react';
import './Track.css'; 

const Track = () => {
  return (
    <div className="track-container">
      <h2>Track Your Flight</h2>
      <div className="search-container">
        <input type="text" placeholder="Search flight..." />
        <button className="search-button">Track</button>
      </div>
    </div>
  );
};

export default Track;

