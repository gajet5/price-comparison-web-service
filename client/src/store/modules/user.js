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
    saveToken(ctx, token) {
      localStorage.setItem('userSession', token);
    }
  }
};
