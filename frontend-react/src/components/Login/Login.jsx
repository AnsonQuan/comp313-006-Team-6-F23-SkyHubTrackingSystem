import React from 'react';
import './Login.css'; 

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className="form-group">
        <button className="login-button">Login</button>
      </div>
      <div className="register-link">
        <p>Not registered yet? <a href="/register">Register now</a></p>
      </div>
    </div>
  );
};

export default Login;

