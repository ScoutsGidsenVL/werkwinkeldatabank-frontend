import Vue from 'vue'
import Vuex from 'vuex'
import ConfigModule from './configModule'
import NotificationModule from './notificationModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    config: ConfigModule,
    notifications: NotificationModule
  }
})
