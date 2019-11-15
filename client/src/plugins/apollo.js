import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(VueApollo);

function getAuthHeader() {
  const token = localStorage.getItem('userSession');
  return token ? { authorization: `Bearer ${token}` } : false;
}

const headers = { ...getAuthHeader() };

// todo: Вынести в конфиг uri
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: `http://${location.hostname}:3000/api`,
    headers
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export {
  apolloClient,
  apolloProvider
};
