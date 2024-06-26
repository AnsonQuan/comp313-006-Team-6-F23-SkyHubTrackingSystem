
import React, {useState, useEffect} from 'react';
import './Login.css'; 
import {gql, useQuery, useMutation} from '@apollo/client';
import { useNavigate  } from 'react-router-dom';

// Mutation for User Login
const LOGIN_USER = gql`
   mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      token 
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
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      // Assuming `data.login.firstName` contains the first name
      localStorage.setItem('firstName', data.login.firstName); 
      console.log('Login successful');
      navigate('/');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Login error:', error);
      if (error.graphQLErrors) console.log('GraphQL Errors:', error.graphQLErrors);
      if (error.networkError) console.log('Network Error:', error.networkError);
      alert('Login failed. Please check console for more details.');
      // alert('Login failed: ' + error.message);
    }
  });
  
  const [screen, setScreen] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const handleLogin = async (event) =>{
    event.preventDefault();
    console.log('email and password: ', email + ' ' + password);

    try {
      const {data} = await loginUser({
        variables: {email, password}
      });
      if (data && data.login){
        setScreen(true);
      }
      setEmail('');
      setPassword('');
      console.log('screen: ', screen);
    } catch (error) {
      console.log('Login error: ', error);
    }
  };

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