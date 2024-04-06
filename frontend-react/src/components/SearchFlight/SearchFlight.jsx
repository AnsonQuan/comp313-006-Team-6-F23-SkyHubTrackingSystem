import React, { useState } from 'react';
import './SearchFlight.css';
import { useNavigate } from 'react-router-dom';

const SearchFlight = () => {

  const navigate = useNavigate();

  const [originCode, setOriginCode] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    const today = new Date();
    const selectedDate = new Date(departureDate);
    if (selectedDate < today) {
      setErrorMessage('Please select a future departure date.');
      return;
    }

    fetch(`http://localhost:5000/flight-search?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${departureDate}`)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const formattedResults = data.data.map(item => ({
            oneWay: item.oneWay,
            lastTicketingDate: item.lastTicketingDate,
            duration: item.itineraries[0].duration,
            destination: item.itineraries[0].segments[1].arrival.iataCode,
            departureDate: item.itineraries[0].segments[0].departure.at.substring(0, 10),
            totalPrice: item.price.total
          }));
          setSearchResults(formattedResults);
          setErrorMessage('');
        } else {
          setSearchResults([]);
          setErrorMessage('No flight results found.');
        }
      })
      .catch(error => {
        console.error('Error fetching flight search results:', error);
        setErrorMessage('An error occurred while fetching flight search results.');
      });
  };

  const handleBookClick = (flightInfo) => {
    navigate('/booking', {state: {flightInfo, originCode}});
  }

  return (
    <div className="flight-search-container">
      <h2>Flight Search</h2>
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
      <div className="form-group">
        <label htmlFor="destinationCode">Destination Code:</label>
        <input
          type="text"
          id="destinationCode"
          placeholder="Enter destination code..."
          value={destinationCode}
          onChange={e => setDestinationCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="departureDate">Departure Date:</label>
        <input
          type="date"
          id="departureDate"
          value={departureDate}
          onChange={e => setDepartureDate(e.target.value)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="help-message">
        Don't know the origin/destination code? Click <a href="https://www.iata.org/en/publications/directories/code-search/">HERE</a>.
      </div>
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="result-item">
            <p>Destination: {result.destination}</p>
            <p>Departure Date: {result.departureDate}</p>
            <p>Total Price: {result.totalPrice} EUR</p>
            <p>One Way: {result.oneWay ? 'Yes' : 'No'}</p>
            <p>Last Ticketing Date: {result.lastTicketingDate}</p>
            <p>Duration: {result.duration}</p>
            <div>
              <button onClick={() => handleBookClick(result)} >Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFlight;
