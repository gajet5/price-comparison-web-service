import Vue from 'vue';
import Router from 'vue-router';

import Registration from '@/views/Registration';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    }
  ]
});
