import Vue from 'vue';
import Router from 'vue-router';

import Registration from '@/pages/Registration';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      component: Admin
    }
  ]
});
