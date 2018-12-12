import api from '@/api/';

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
  getProductDescriptionByKey: state => key => state[key],
};

// actions
const actions = {
  fetchProductDescriptionByKey({ commit }, key) {
    api.getProductDescriptionByKey(key).then((description) => {
      commit('setProductDescriptionByKey', { description, key });
    });
  },
};

// mutations
const mutations = {
  setProductDescriptionByKey(state, { description, key }) {
    state[key] = description;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
