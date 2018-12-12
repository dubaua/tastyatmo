import 'normalize.css';
import '@/styles/main.scss';
import Vue from 'vue';
import VueMq from 'vue-mq';
import Vue2TouchEvents from 'vue2-touch-events';
import VueFormGenerator from 'vue-form-generator';
import '@/components/globals';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueFormGenerator);
Vue.use(Vue2TouchEvents);
Vue.use(VueMq, {
  breakpoints: {
    mobile: 1200,
    desktop: Infinity,
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
