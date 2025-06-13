import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

const httpLink = createHttpLink({
  uri: 'https://countries.trevorblades.com/',
});

const cache = new InMemoryCache();
export function createApollo() {
  return new ApolloClient({
    link: httpLink,
    cache,
  });
}