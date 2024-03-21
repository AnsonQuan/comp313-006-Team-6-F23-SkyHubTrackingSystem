import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="centered-footer-column">
          <h4>Connect with Us</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>
        <div className="right-footer-column">
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookie Policy</p>
        </div>
        <div className="additional-footer-column">
          <h4>Company</h4>
          <p>About</p>
          <p>Jobs</p>
          <p>Partnerships</p>
          <p>Advertising</p>
          <p>Affiliate Marketing</p>
        </div>
        <div className="additional-footer-column">
          <h4>Explore</h4>
          <p>Canada travel guide</p>
          <p>Vacation packages in Canada</p>
          <p>Domestic flights</p>
          <p>Travel blog</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SkyHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

