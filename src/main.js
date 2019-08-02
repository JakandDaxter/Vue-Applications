import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import 'es6-promise/auto'; // for Promise polyfill
import { getField, updateField } from 'vuex-map-fields';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(Vuex);
Vue.use(SuiVue);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    form: {
      sid: '',
      email: '',
      number: '',
    },
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
