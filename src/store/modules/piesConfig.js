import api from '@/api/';
import { schema, normalize } from 'normalizr';

const position = new schema.Entity('positions');
const arrayOfPositions = [position];

/* eslint-disable no-shadow, no-return-assign, no-param-reassign */

const state = {
  doughTypes: null,
  fillingTypes: null,
  weightTypes: null,
};

const prepareConfig = config => config.value;

// actions
const actions = {
  getPiesConfig({ commit }) {
    api.getRegionByKey('piesConfig').then((region) => {
      const { doughTypes, fillingTypes, weightTypes } = region;
      commit('setPiesConfigByKey', {
        key: 'doughTypes',
        config: doughTypes.map(prepareConfig),
      });
      commit('setPiesConfigByKey', {
        key: 'fillingTypes',
        config: fillingTypes.map(prepareConfig),
      });
      commit('setPiesConfigByKey', {
        key: 'weightTypes',
        config: weightTypes.map(prepareConfig),
      });
    });
  },
};

// mutations
const mutations = {
  setPiesConfigByKey(state, { config, key }) {
    state[key] = normalize(config, arrayOfPositions).entities.positions;
  },
};

export default {
  state,
  actions,
  mutations,
};
