import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './app.vue'
import router from './router'
import store from './store/store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { getModule } from 'vuex-module-decorators'
import { OpenIdConnectPlugin } from 'inuits-vuejs-oidc'
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
import EnvRepository from './repositories/envRepository'


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
// const envVariables = new EnvRepository().getEnvVars()
// const configFile = new MasterConfig().deserialize(envVariables)

new StaticFileRepository().getFile('cfg/config.json').then((configFile: any) => {
  configFile = new MasterConfig().deserialize(configFile)
  if (configFile.oidc && configFile.oidc.baseUrl && configFile.oidc.clientId) {
    Vue.use(OpenIdConnectPlugin, {
      store: store,
      router: router,
      configuration: {
        baseUrl: configFile.oidc.baseUrl,
        serverBaseUrl: configFile.oidc.serverBaseUrl,
        tokenEndpoint: configFile.oidc.tokenEndpoint ? configFile.oidc.tokenEndpoint : 'token',
        authEndpoint: configFile.oidc.authEndpoint ? configFile.oidc.authEndpoint : 'auth',
        logoutEndpoint: configFile.oidc.logoutEndpoint ? configFile.oidc.logoutEndpoint : 'logout',
        clientId: configFile.oidc.clientId,
        authorizedRedirectRoute: '/',
        serverTokenEndpoint: 'token/',
        serverRefreshEndpoint: 'token/',
        InternalRedirectUrl: ''
      }
    })
  }

  const configStoreModule = getModule(configModule, store)
  configStoreModule.setConfig(configFile)

  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#wwdb')
})
