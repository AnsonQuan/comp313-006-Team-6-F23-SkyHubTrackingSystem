import React, { useState } from 'react';
import './Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Skyhub</Link> 
        <div className={`nav-links ${showMenu ? 'active' : ''}`}>
          <Link to="/about">About</Link> 
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/review">Review</Link>
          <Link to="/track">Track</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={showMenu ? faTimes : faBars} /> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

