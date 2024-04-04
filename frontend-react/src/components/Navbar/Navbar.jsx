import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faSignInAlt, faUserPlus, faSearch, faStar, faPhone, faPlane, faInfoCircle, faPlaneDeparture  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/images/About/SKYHUB.jpg" alt="Skyhub Logo" className="logo-img" />
          <span className="logo-text">Skyhub</span>
        </Link>
        <div className={`nav-links ${showMenu ? 'active' : ''}`}>
          <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link>
          <Link to="/contact"><FontAwesomeIcon icon={faPhone} /> Contact</Link>
          <Link className="login-item" to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
          <Link to="/review"><FontAwesomeIcon icon={faStar} /> Review</Link>
          <Link to="/track"><FontAwesomeIcon icon={faPlane} /> Track</Link>
           <Link to="/booking"><FontAwesomeIcon icon={faPlaneDeparture } /> Booking</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
