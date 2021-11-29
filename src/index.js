import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
  useQuery,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { GlobalProvider } from "./context/globalContext";
import Swal from 'sweetalert2';



const httpLink = createHttpLink({
  uri: 'http://localhost:3031/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      Swal.fire({
        icon: 'error',
        title: 'Error ',
        html: `Message: ${graphQLErrors[0].message}`,
      }),
      
    );

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    Swal.fire({
      icon: 'error',
      title: 'Error ',
      html: `Message: ${networkError}`,
    })
  };
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  console.log('successfull call', accessToken)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    }
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    addTypename: false
  })
});
ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
    <ApolloProvider client={client}>
      
      <App />
     
    
  </ApolloProvider>
  </GlobalProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
