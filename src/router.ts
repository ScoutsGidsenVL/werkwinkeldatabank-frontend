import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import WerkwinkelCreate from './views/werkwinkels/Create.vue'
import WerkwinkelOverview from './views/werkwinkels/Overview.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'WerkwinkelOverview',
    component: WerkwinkelOverview,
    meta: {
      title: 'Werkwinkels'
    }
  },
  {
    path: '/new',
    name: 'WerkwinkelCreate',
    component: WerkwinkelCreate,
    meta: {
      title: 'Nieuwe werkwinkel'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
