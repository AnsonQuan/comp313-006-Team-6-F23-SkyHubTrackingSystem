import React from 'react';
import './Register.css'; 

const Register = () => {
  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" />
      </div>
      <div className="form-group">
        <button className="register-button">Register</button>
      </div>
      <div className="login-link">
        <p>Already registered? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;

