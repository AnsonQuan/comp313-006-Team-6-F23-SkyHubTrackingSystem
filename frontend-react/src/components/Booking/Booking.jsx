import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import './Booking.css';

const ADD_BOOKING = gql`
  mutation AddBooking(
    $flightNumber: String!,
    $passengerName: String!,
    $seatNumber: String!,
    $departureAirport: String!,
    $arrivalAirport: String!,
    $departureDate: Date!,
    $arrivalDate: Date!,
    $ticketPrice: Float!,
    $status: String!
  ) {
    addBooking(
      flightNumber: $flightNumber,
      passengerName: $passengerName,
      seatNumber: $seatNumber,
      departureAirport: $departureAirport,
      arrivalAirport: $arrivalAirport,
      departureDate: $departureDate,
      arrivalDate: $arrivalDate,
      ticketPrice: $ticketPrice,
      status: $status
    ) {
      id
    }
  }
`;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    flightNumber: '',
    passengerName: '',
    seatNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    arrivalDate: '',
    ticketPrice: '',
    status: 'pending', // Default status
  });

  const [addBooking] = useMutation(ADD_BOOKING);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({ variables: { ...formData, ticketPrice: parseFloat(formData.ticketPrice) } });
      alert('Booking successful!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Flight</h2>
      <div className="form-group">
        <label htmlFor="flightNumber">Flight Number:</label>
        <input type="text" id="flightNumber" name="flightNumber" value={formData.flightNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="passengerName">Passenger Name:</label>
        <input type="text" id="passengerName" name="passengerName" value={formData.passengerName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="seatNumber">Seat Number:</label>
        <input type="text" id="seatNumber" name="seatNumber" value={formData.seatNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="departureAirport">Departure Airport:</label>
        <input type="text" id="departureAirport" name="departureAirport" value={formData.departureAirport} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="arrivalAirport">Arrival Airport:</label>
        <input type="text" id="arrivalAirport" name="arrivalAirport" value={formData.arrivalAirport} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="departureDate">Departure Date:</label>
        <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="arrivalDate">Arrival Date:</label>
        <input type="date" id="arrivalDate" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="ticketPrice">Ticket Price:</label>
        <input type="number" id="ticketPrice" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {/* Add other form fields here */}
      <div className="form-group">
        <button className="booking-button" onClick={handleSubmit}>Submit Booking</button>
      </div>
    </div>
  );
};

export default BookingForm;
