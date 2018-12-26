import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import modules from './modules';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexPersist = new VuexPersistence({
  key: 'vuex',
  strictMode: debug,
  storage: window.localStorage,
  modules: ['products', 'productDescription', 'cart'],
});

const store = new Vuex.Store({
  modules,
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  },
  plugins: [vuexPersist.plugin],
});

const keys = ['pizza', 'sushi', 'wok', 'drinks'];

keys.forEach((key) => {
  Promise.all([
    store.dispatch('fetchProductsByKey', key),
  ]);
});

store.dispatch('getPiesConfig');
store.dispatch('getBanners');

export default store;
