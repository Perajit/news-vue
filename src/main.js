import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import formatFilters from './filters/format.filter';

Vue.config.productionTip = false;

Object.entries(formatFilters).forEach(([name, filter]) => {
  Vue.filter(name, filter);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
