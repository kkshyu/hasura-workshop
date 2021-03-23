import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = (token) =>
  new ApolloClient({
    uri: process.env.REACT_APP_HASURA_URI,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
