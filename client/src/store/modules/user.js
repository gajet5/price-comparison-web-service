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
    login({ commit }, token) {
      localStorage.setItem('userSession', token);
      commit('setToken', token);
    },
    logout({ commit }) {
      localStorage.removeItem('userSession');
      commit('setToken', null);
    }
  }
};
