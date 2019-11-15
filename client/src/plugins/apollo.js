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

const apiClient = new ApolloClient({
  link: createHttpLink({
    uri: `http://${location.hostname}:${location.port ? 3000 : ''}/api`
  }),
  cache: new InMemoryCache()
});

const adminClient = new ApolloClient({
  link: createHttpLink({
    uri: `http://${location.hostname}:${location.port ? 3000 : ''}/admin`,
    headers
  }),
  cache: new InMemoryCache()
});

const apolloProvider = new VueApollo({
  defaultClient: apiClient,
  clients: {
    apiClient,
    adminClient
  }
});

export {
  apiClient,
  adminClient,
  apolloProvider
};
