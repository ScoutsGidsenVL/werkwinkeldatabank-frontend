import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './app.vue'
import router from './router'
import store from './store/store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { getModule } from 'vuex-module-decorators'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

import './main.scss'
import StaticFileRepository from './repositories/staticFileRepository'
import MasterConfig from './models/config/masterConfig'
import configModule from './store/configModule'


// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})


// Install VeeValidate components globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.use(VueCompositionAPI)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(CKEditor)

Vue.config.productionTip = false

// Load config
new StaticFileRepository().getFile('cfg/config.json').then((configFile: any) => {
  configFile = new MasterConfig().deserialize(configFile)

  const configStoreModule = getModule(configModule, store)
  configStoreModule.setConfig(configFile)

  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#wwdb')
})
