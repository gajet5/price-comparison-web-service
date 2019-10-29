import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import { apolloProvider } from '@/plugins/apollo';
import vuetify from '@/plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app');
