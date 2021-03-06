import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  //host: '192.168.1.100:3000',
  count: 0,
  selfPos: {
  },
  otherPos: {},
  groupList: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
    ], () => {
      store.hotUpdate({
        getters: require('./getters'),
        actions: require('./actions'),
        mutations: require('./mutations')
      })
    })
}

export default store