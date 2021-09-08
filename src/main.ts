import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './app.vue'
import router from './router'
import store from './store/store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { getModule } from 'vuex-module-decorators'
import { OpenIdConnectPlugin } from 'inuits-vuejs-oidc'
import VueScrollTo from 'vue-scrollto'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import nl from 'vee-validate/dist/locale/nl.json'

import './main.scss'
import StaticFileRepository from './repositories/staticFileRepository'
import MasterConfig from './models/config/masterConfig'
import configModule from './store/configModule'
import EnvRepository from './repositories/envRepository'
import RepositoryFactory from './repositories/repositoryFactory'
import AuthRepository from './repositories/authRepository'
import userModule from './store/userModule'

// Install VeeValidate rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

localize('nl', nl)

// Install VeeValidate components globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.use(VueCompositionAPI)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(CKEditor)

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.config.productionTip = false

// Load config
// const envVariables = new EnvRepository().getEnvVars()
// const configFile = new MasterConfig().deserialize(envVariables)

new StaticFileRepository().getFile('config.json').then((configFile: any) => {
  configFile = new MasterConfig().deserialize(configFile)
  if (configFile.oidc && configFile.oidc.baseUrl && configFile.oidc.clientId) {
    Vue.use(OpenIdConnectPlugin, {
      store: store,
      router: router,
      configuration: {
        baseUrl: configFile.oidc.baseUrl,
        serverBaseUrl: configFile.oidc.serverBaseUrl,
        tokenEndpoint: configFile.oidc.tokenEndpoint
          ? configFile.oidc.tokenEndpoint
          : 'token',
        authEndpoint: configFile.oidc.authEndpoint
          ? configFile.oidc.authEndpoint
          : 'auth',
        logoutEndpoint: configFile.oidc.logoutEndpoint
          ? configFile.oidc.logoutEndpoint
          : 'logout',
        clientId: configFile.oidc.clientId,
        authorizedRedirectRoute: '/',
        serverTokenEndpoint: configFile.oidc.baseUrl + '/token/',
        serverRefreshEndpoint: configFile.oidc.baseUrl + '/refresh/',
        InternalRedirectUrl: configFile.oidc.InternalRedirectUrl
          ? configFile.oidc.InternalRedirectUrl
          : '',
      },
    })
  }

  const configStoreModule = getModule(configModule, store)
  configStoreModule.setConfig(configFile)

  router.beforeEach((to: any, from: any, next: any) => {
    // if (to.matched.some((record: any) => record.meta.requiresOpenIdAuth)) {
    const userStoreModule = getModule(userModule, store)
    if (store.getters['openid/isLoggedIn']) {
      !userStoreModule.loaded
        ? RepositoryFactory.get(AuthRepository)
          .me()
          .then((user: any) => {
            userStoreModule.setMe(user).then(() => {
              next()
            })
          })
        : next()
    } else {
      next()
    }
    // } else {
    //   next()
    // }
  })

  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#wwdb')
})
