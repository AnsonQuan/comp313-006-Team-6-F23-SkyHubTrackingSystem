import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Review from './components/Review/Review';
import Track from './components/Track/Track';
import Footer from './components/Footer/Footer';
import Booking from './components/Booking/Booking';

import './App.css';
import SetOrigin from './components/SetOrigin/SetOrigin';
import FlightOriginDeal from './components/FlightOriginDeal/FlightOriginDeal';



const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/review" element={<Review/>} />
            <Route path="/track" element={<Track/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/set-origin" element={<SetOrigin/>} />
            <Route path="/flight-origin-deal" element={<FlightOriginDeal/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
