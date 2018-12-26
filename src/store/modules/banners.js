import api from '@/api/';
/* eslint-disable no-shadow, no-return-assign, no-param-reassign */

const state = {
  items: [],
};

// actions
const actions = {
  getBanners({ commit }) {
    api.getCollectionByKey('banners').then((banners) => {
      commit('setBanners', { banners });
    });
  },
};

// mutations
const mutations = {
  setBanners(state, { banners }) {
    state.items = banners;
  },
};

export default {
  state,
  actions,
  mutations,
};
