import gql from 'graphql-tag';
import { apolloClient } from '@/plugins/apollo';

export default {
  namespaced: true,
  state: {
    token: null,
    loggedIn: false
  },
  getters: {
    token(state) {
      return state.token;
    }
  },
  mutations: {
    setLoggedIn(state, status) {
      state.loggedIn = status;
    },
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
    tryIdentifyUser(ctx) {
      const token = localStorage.getItem('userSession');
      if (token) {
        ctx.commit('setToken', token);
        ctx.commit('setLoggedIn', true);
      }
    },
    saveToken(ctx, token) {
      ctx.commit('setLoggedIn', true);
      localStorage.setItem('userSession', token);
    }
  }
};
