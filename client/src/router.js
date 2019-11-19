import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/pages/Main';
import Registration from '@/pages/Registration';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';

import store from '@/store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter(to, from, next) {
        if (store.getters['user/loggedIn']) {
          return next();
        } else {
          return next('login');
        }
      }
    }
  ]
});
