import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, createHttpLink, from  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';

// const link = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
//   credentials: 'include'
// });
// //
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link,
// });

// const client = new ApolloClient({
//   link: createHttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials:'include',
//   }),
//   cache: new InMemoryCache(),
// });

const httpLink  = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
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

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  </React.StrictMode>,
)
