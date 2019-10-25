import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

// Todo: Разные локали?
// https://vuetifyjs.com/en/customization/internationalization#api

export default new Vuetify({
  lang: {
    locales: { ru },
    current: 'ru'
  },
  icons: {
    iconfont: 'mdi'
  }
});
