import gql from 'graphql-tag';
import { apolloClient } from '@/plugins/apollo';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('userSession') || null
  },
  getters: {
    loggedIn(state) {
      return !!state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async getTokenStatus(ctx) {
      const { data: { tokenValidate } } = await apolloClient.query({
        query: gql`${require('@/gql/tokenValidate.graphql')}`,
        variables: {
          token: ctx.getters.token
        }
      });
        console.log(tokenValidate);
    },
    saveToken(ctx, token) {
      localStorage.setItem('userSession', token);
    }
  }
};
