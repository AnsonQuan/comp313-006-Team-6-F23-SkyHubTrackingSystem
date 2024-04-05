import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import axios from 'axios';

// GraphQL endpoint
const graphqlLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: graphqlLink,
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
