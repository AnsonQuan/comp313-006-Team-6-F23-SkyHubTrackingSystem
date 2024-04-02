import React, { useState } from 'react';
// import { fetchFlightData } from './api'; // Assuming you have an API module for fetching flight data
import './Flight.css';

function FlightsPage() {
  const [tripType, setTripType] = useState('roundtrip');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  const handleSearch = async () => {
    // Perform API request using selected options
    const searchData = {
      tripType,
      departure,
      arrival,
      departureDate,
      returnDate,
      travelers
    };

    try {
      const flightResults = await fetchFlightData(searchData);
      // Handle flight results, such as displaying them on the page
      console.log(flightResults);
    } catch (error) {
      // Handle error
      console.error('Error fetching flight data:', error);
    }
  };

  return (
    <div>
      <h1>Flights</h1>
      <div>
        <label>
          <input 
            type="radio" 
            value="roundtrip" 
            checked={tripType === 'roundtrip'} 
            onChange={() => setTripType('roundtrip')} 
          />
          Roundtrip
        </label>
        <label>
          <input 
            type="radio" 
            value="oneway" 
            checked={tripType === 'oneway'} 
            onChange={() => setTripType('oneway')} 
          />
          One Way
        </label>
        <label>
          <input 
            type="radio" 
            value="multicity" 
            checked={tripType === 'multicity'} 
            onChange={() => setTripType('multicity')} 
          />
          Multi-City
        </label>
      </div>
      <div>
        <label>Leaving From:</label>
        <input 
          type="text" 
          value={departure} 
          onChange={(e) => setDeparture(e.target.value)} 
        />
      </div>
      <div>
        <label>Going To:</label>
        <input 
          type="text" 
          value={arrival} 
          onChange={(e) => setArrival(e.target.value)} 
        />
      </div>
      <div>
        <label>Departure Date:</label>
        <input 
          type="date" 
          value={departureDate} 
          onChange={(e) => setDepartureDate(e.target.value)} 
        />
      </div>
      {tripType === 'roundtrip' && (
        <div>
          <label>Return Date:</label>
          <input 
            type="date" 
            value={returnDate} 
            onChange={(e) => setReturnDate(e.target.value)} 
          />
        </div>
      )}
      <div>
        <label>Travelers:</label>
        <input 
          type="number" 
          value={travelers} 
          onChange={(e) => setTravelers(e.target.value)} 
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FlightsPage;
