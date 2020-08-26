import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import WerkwinkelOverview from './views/workshops/overview.vue'
import ThemesOverview from './views/themes/overview.vue'
import WerkwinkelView from './views/workshops/view.vue'
import ThemeForm from './views/themes/form.vue'
import WorkshoptForm from './views/workshops/form.vue'
import BuildingBlockForm from './views/building-blocks/form.vue'

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
    component: WorkshoptForm,
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
    component: WorkshoptForm,
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
    component: ThemeForm,
    meta: {
      title: 'Nieuwe thema'
    }
  },
  {
    path: '/themas/:themeId/edit',
    name: 'ThemeEdit',
    component: ThemeForm,
    meta: {
      title: 'Thema'
    }
  },
  {
    path: '/bouwblokken/nieuw',
    name: 'BuildingBlockCreate',
    component: BuildingBlockForm,
    meta: {
      title: 'Nieuwe bouwblok'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
