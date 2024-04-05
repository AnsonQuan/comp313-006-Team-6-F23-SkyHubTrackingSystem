import React, { useState } from 'react';
import './FlightOriginDeal.css';

const FlightOriginDeal = () => {
  const [originCode, setOriginCode] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    fetch(`http://localhost:5000/flight-deal-by-origin/${originCode}`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          setSearchResults(data.data);
          setErrorMessage('');
        } else {
          setSearchResults([]);
          setErrorMessage('Sorry, this origin code does not have any flight deals.');
        }
      })
      .catch(error => {
        console.error('Error fetching flight deals:', error);
        setErrorMessage('An error occurred while fetching flight deals.');
      });
  };

  return (
    <div className="search-container">
      <h2>Flight Origin Deal</h2>
      <div className="form-group">
        <label htmlFor="originCode">Origin Code:</label>
        <input
          type="text"
          id="originCode"
          placeholder="Enter origin code..."
          value={originCode}
          onChange={e => setOriginCode(e.target.value)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="search-results-container">
            <p>Destination: {result.destination}</p>
            <p>Departure Date: {result.departureDate}</p>
            <p>Return Date: {result.returnDate}</p>
            <p>Total Price: {result.price.total} EUR</p>
            <div>
              <a href={result.links.flightDates}>Flight Dates</a>
              <a href={result.links.flightOffers}>Flight Offers</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightOriginDeal;
