import api from '@/api/';
/* eslint-disable no-shadow, no-return-assign, no-param-reassign */

const state = {
  content: [],
};

// actions
const actions = {
  getInfo({ commit }) {
    api.getRegionByKey('info').then((info) => {
      commit('setInfo', { info });
    });
  },
};

// mutations
const mutations = {
  setInfo(state, { info }) {
    state.content = info.content;
  },
};

export default {
  state,
  actions,
  mutations,
};
