import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import './Booking.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

const ADD_BOOKING = gql`
  mutation AddBooking(
    $flightNumber: String!,
    $passengerName: String!,
    $seatNumber: String!,
    $departureAirport: String!,
    $arrivalAirport: String!,
    $departureDate: String!,
    $arrivalDate: String!,
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
      flightNumber
      passengerName
      seatNumber
      departureAirport
      arrivalAirport
      departureDate
      arrivalDate
      ticketPrice
      status
    }
  }
`;

const BookingForm = () => {
  const location = useLocation();
  const {flightInfo, originCode} = location.state || {};
  const [formData, setFormData] = useState({
    flightNumber: '',
    passengerName: '',
    seatNumber: '',
    departureAirport: originCode || '',
    arrivalAirport: flightInfo?.destination,
    departureDate: flightInfo?.departureDate,
    arrivalDate: '',
    ticketPrice: flightInfo.totalPrice,
    status: 'pending', // Default status
  });

  const [addBooking] = useMutation(ADD_BOOKING);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastBookingData, setLastBookingData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For booking a flight ticket 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({ variables: { ...formData, ticketPrice: parseFloat(formData.ticketPrice) } });
      // alert('Booking successful!');
      setLastBookingData(formData); // Save the last booking data
      setShowConfirmation(true); // Show the confirmation dialog
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
  
    }
  };

  // To book another ticket with last booking data 
  const handleBookAnother = () => {
    setFormData({
      ...lastBookingData,
      passengerName:'',
      seatNumber:''
    }); 
    setShowConfirmation(false); // Hide the confirmation dialog
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Hide the confirmation dialog
    navigate('/');
  };




  return (
    <div className="booking-container">
      <h2>Book Your Flight</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="booking-button" type='submit'>Submit Booking</button>
      </div>
      </form>
      {showConfirmation && (
      <div className="confirmation-dialog">
        <p>Do you want to book another ticket?</p>
        <button onClick={handleBookAnother}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    )}
    </div>
  );
};

export default BookingForm;
