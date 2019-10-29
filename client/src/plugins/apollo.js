import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: `http://${location.hostname}:3000/api`
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
