import Vue from 'vue'
import Vuex from 'vuex'
import ConfigModule from './configModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    config: ConfigModule
  }
})
