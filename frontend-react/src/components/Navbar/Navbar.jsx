import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faSignInAlt, faSignOutAlt, faUserPlus, faSearch, faStar, faPhone, faPlane, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useHistory } from 'react-router-dom'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  const history = useHistory();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName'); // Assuming you also store the user's first name upon login
    if (token) {
      setIsLoggedIn(true);
      setFirstName(firstName);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setIsLoggedIn(false);
    history.push('/login');
    window.location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Skyhub</Link>
        <div className={`nav-links ${showMenu ? 'active' : ''}`}>
          <Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link>
          <Link to="/contact"><FontAwesomeIcon icon={faPhone} /> Contact</Link>
          {!isLoggedIn && <Link className="login-item" to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>}
          {isLoggedIn && (
            <>
              <span className="after-login">Hello, {firstName}</span>
              <a href="#" className="login-item" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a>
            </>
          )}
          <Link to="/review"><FontAwesomeIcon icon={faStar} /> Review</Link>
          <Link to="/track"><FontAwesomeIcon icon={faPlane} /> Track</Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
