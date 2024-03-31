import React, {useState, useEffect} from 'react';
import './Login.css'; 
import {gql, useQuery, useMutation} from '@apollo/client';
import { useHistory } from 'react-router-dom';

// Mutation for User Login
const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      firstName
    }
  }
`;

// Query for checking if user is logged in
const LOGGED_IN_USER = gql`
  query isLoggedIn{
    isLoggedIn
  }
`;

const Login = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const [screen, setScreen] = useState(false);
  const history = useHistory(); // For redirecting
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email, password }
      });

      if (data.login.success) {
        setScreen(true);
        // Store the user's name for displaying
        localStorage.setItem('firstName', data.login.firstName);
        await refetchLoggedInData();
        // Redirect to the homepage
        history.push('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Login error: ', error);
    }
  };

  const handleLogout = () => {
    // Clear user session, e.g., remove user's name
    localStorage.removeItem('firstName');
    // Implement your logout logic here, like clearing cookies or tokens
    // Redirect to homepage or login page
    history.push('/login');
  };

  if (screen) {
    // If logged in, display user's name and logout button
    const userName = localStorage.getItem('firstName');
    return (
      <div className="user-greeting">
        <h2>Hello, {userName}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  const {data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError, refetch: refetchLoggedInData} = useQuery(LOGGED_IN_USER);
    // useEffect block
    useEffect(() => {
      const checkLoginStatus = async () => {
          try {
              console.log('--- in checkLoginStatus function ---');
              await refetchLoggedInData(); // Trigger manual refetch
              const isLoggedInVar = isLoggedInData?.isLoggedIn;
              console.log('auth status from graphql server: ', isLoggedInVar);
              if (isLoggedInVar !== undefined && isLoggedInVar !== screen) {
                  console.log('user is logged in');
                  console.log('screen: ', screen);
                  console.log('isLoggedInVar in useEffect: ', isLoggedInVar);
                  // update the screen state variable only if it's different
                  setScreen(isLoggedInVar);
              }
          } catch (e) {
              setScreen(false);
              console.log('error: ', e);
          }
      };

        // Run the checkLoginStatus function once when the component mounts
        checkLoginStatus();
    }, [isLoggedInData, refetchLoggedInData, screen]); // Include refetchLoggedInData in the dependency array

      // Check if user is logged in
    if (isLoggedInData?.isLoggedIn === true) {
        console.log('user is logged in');
        console.log('screen: ', screen);
    }

  return (
<div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">Login</button>
        </div>
      </form>
      <div className="register-link">
        <p>Not registered yet? <a href="/register">Register now</a></p>
      </div>
    </div>
  );
};

export default Login;

