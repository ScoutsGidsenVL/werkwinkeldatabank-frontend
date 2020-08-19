import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import WerkwinkelCreate from './views/werkwinkels/create.vue'
import ThemeCreate from './views/themes/create.vue'
import WerkwinkelEdit from './views/werkwinkels/edit.vue'
import ThemeEdit from './views/themes/edit.vue'
import WerkwinkelOverview from './views/werkwinkels/overview.vue'
import ThemesOverview from './views/themes/overview.vue'
import WerkwinkelView from './views/werkwinkels/view.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // Werkwinkels
  {
    path: '/werkwinkels',
    name: 'WerkwinkelOverview',
    component: WerkwinkelOverview,
    meta: {
      title: 'Werkwinkels'
    }
  },
  {
    path: '/werkwinkels/nieuw',
    name: 'WerkwinkelCreate',
    component: WerkwinkelCreate,
    meta: {
      title: 'Nieuwe werkwinkel'
    }
  },
  {
    path: '/werkwinkels/:workshopId',
    name: 'WerkwinkelView',
    component: WerkwinkelView,
    meta: {
      title: 'Werkwinkel'
    }
  },
  {
    path: '/werkwinkels/:workshopId/edit',
    name: 'WerkwinkelEdit',
    component: WerkwinkelEdit,
    meta: {
      title: 'Werkwinkel'
    }
  },
  // Thema's
  {
    path: '/themas',
    name: 'ThemeOverview',
    component: ThemesOverview,
    meta: {
      title: 'Thema\'s'
    }
  },
  {
    path: '/themas/nieuw',
    name: 'ThemeCreate',
    component: ThemeCreate,
    meta: {
      title: 'Nieuwe thema'
    }
  },
  {
    path: '/themas/:themeId/edit',
    name: 'ThemeEdit',
    component: ThemeEdit,
    meta: {
      title: 'Thema'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
