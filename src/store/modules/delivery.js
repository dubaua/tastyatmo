import api from '@/api/';
/* eslint-disable no-shadow, no-return-assign, no-param-reassign */

const state = {
  content: [],
};

// actions
const actions = {
  getDelivery({ commit }) {
    api.getRegionByKey('delivery').then((delivery) => {
      commit('setDelivery', { delivery });
    });
  },
};

// mutations
const mutations = {
  setDelivery(state, { delivery }) {
    state.content = delivery.content;
  },
};

export default {
  state,
  actions,
  mutations,
};
