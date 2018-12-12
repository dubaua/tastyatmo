import api from '@/api/';
import { schema, normalize } from 'normalizr';

const product = new schema.Entity('products', {}, { idAttribute: '_id' });
const arrayOfProducts = [product];

/* eslint-disable no-shadow, no-return-assign, no-param-reassign */

const state = {
  pizza: null,
  desserts: null,
  drinks: null,
  salad: null,
  snack: null,
};

// getters
const getters = {
  getProductsByKey: state => key => state[key],
};

// actions
const actions = {
  fetchProductsByKey({ commit }, key) {
    // fetch also descriptiuons
    api.getProductsByKey(key).then(products => commit('setProducts', { products, key }));
  },
};

// mutations
const mutations = {
  setProducts(state, { products, key }) {
    state[key] = normalize(products, arrayOfProducts).entities.products;
  },
  setVersion(state, { product, productId, versionId }) {
    state[product][productId].chosenVersion = versionId;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
