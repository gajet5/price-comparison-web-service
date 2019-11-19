import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

Vue.use(VueApollo);

const apiClient = new ApolloClient({
  link: createHttpLink({
    uri: `http://${location.hostname}:${location.port ? 3000 : ''}/api`
  }),
  cache: new InMemoryCache()
});

const adminHttpLink = createHttpLink({
  uri: `http://${location.hostname}:${location.port ? 3000 : ''}/admin`
});

const authAdminHttpLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('userSession');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const adminClient = new ApolloClient({
  link: authAdminHttpLink.concat(adminHttpLink),
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
