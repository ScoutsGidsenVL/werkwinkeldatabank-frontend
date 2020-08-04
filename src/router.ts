import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import WerkwinkelCreate from './views/werkwinkels/create.vue'
import WerkwinkelOverview from './views/werkwinkels/overview.vue'
import WerkwinkelView from './views/werkwinkels/view.vue'

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
  },
  {
    path: '/werkwinkel/:workshopId',
    name: 'WerkwinkelView',
    component: WerkwinkelView,
    meta: {
      title: 'Werkwinkel'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
