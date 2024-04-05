import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import axios from 'axios';

// GraphQL endpoint
const graphqlLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});


const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from ([authLink, graphqlLink]),
});

// REST API endpoint
const restClient = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your REST API base URL
});

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
    <App restClient={restClient} />
  </ApolloProvider>,
  document.getElementById('root')
);
