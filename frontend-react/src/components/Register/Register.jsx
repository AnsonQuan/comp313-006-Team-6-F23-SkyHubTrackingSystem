import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Register.css'; 

// addUser Mutation
const ADD_USER = gql`
  mutation AddUser($firstName: String!, $lastName: String!, $address: String!, $phoneNumber: String!, $email: String!, $password:String!, $role:String!){
    addUser(firstName:$firstName, lastName:$lastName, address:$address, phoneNumber:$phoneNumber, email:$email, password:$password, role:$role){
      firstName
      lastName
      address
      phoneNumber
      email
      password
      role
    }
  }
          
`;

const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  
  // AddUser mutation
  const [addUser] = useMutation(ADD_USER);

  const saveUser = (e) =>{
    setShowLoading(true);
    e.preventDefault();

    addUser({variables:{firstName,lastName,address,phoneNumber,email,password,role}});
    // Clear input fields;
    setFirstName('');
    setLastName('');
    setAddress('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setRole('');
    setShowLoading(false);

  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={saveUser}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" />
        </div>
        <div className="form-group">
          <button type='submit' className="register-button">Register</button>
        </div>
      </form>
      <div className="login-link">
        <p>Already registered? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;

