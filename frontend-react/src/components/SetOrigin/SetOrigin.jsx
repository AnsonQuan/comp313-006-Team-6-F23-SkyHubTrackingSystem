import React, { useState } from 'react';
import axios from 'axios';
import './SetOrigin.css';

const SetOrigin = () => {
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/city-and-airport-search/${city}`);
      if (response.data.data && response.data.data.length > 0) {
        setSearchResult(response.data.data);
        setErrorMessage('');
      } else {
        setSearchResult([]);
        setErrorMessage('Sorry, this destination is not currently supported.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  return (
    <div>
      <div className="form-container">
      <h2>Set Origin</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        {searchResult.map((result) => (
          <div key={result.id} className="search-result-container">
            <h3>{result.name}</h3>
            <p>{result.address.cityName}, {result.address.countryName}</p>
            {result.iataCode && <p>IATA Code: {result.iataCode}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetOrigin;
