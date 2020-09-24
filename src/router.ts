import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import WerkwinkelOverview from './views/workshops/overview.vue'
import ThemesOverview from './views/themes/overview.vue'
import WerkwinkelView from './views/workshops/view.vue'
import ThemeForm from './views/themes/form.vue'
import WorkshoptForm from './views/workshops/form.vue'
import BuildingBlockForm from './views/building-blocks/form.vue'
import BuildingBlockOverview from './views/building-blocks/overview.vue'
import CategoryBlockForm from './views/categories/form.vue'
import CategoryBlockOverview from './views/categories/overview.vue'
import PublishedWorkshopRepository from './repositories/entities/publishedWorkshopRepository'
import MyWorkshopRepository from './repositories/entities/myWorkshopRepository'
import WorkshopRepository from './repositories/entities/workshopRepository'
import StartView from './views/start.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'Start',
    component: StartView,
    meta: {
      title: 'WWDB'
    }
  },
  // Werkwinkels
  {
    path: '/werkwinkels',
    name: 'WerkwinkelOverview',
    component: WerkwinkelOverview,
    props: {
      workshopReposioryType: PublishedWorkshopRepository,
      showCreate: false
    },
    meta: {
      title: 'Werkwinkels'
    }
  },
  {
    path: '/mijn-werkwinkels',
    name: 'MijnWerkwinkelOverview',
    component: WerkwinkelOverview,
    props: {
      workshopReposioryType: WorkshopRepository
    },
    meta: {
      requiresOpenIdAuth: true,
      title: 'Mijn werkwinkels'
    }
  },
  {
    path: '/werkwinkels/nieuw',
    name: 'WerkwinkelCreate',
    component: WorkshoptForm,
    meta: {
      requiresOpenIdAuth: true,
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
      requiresOpenIdAuth: true,
      title: 'Werkwinkel bewerken'
    }
  },
  // Themes
  {
    path: '/themas',
    name: 'ThemeOverview',
    component: ThemesOverview,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Thema\'s'
    }
  },
  {
    path: '/themas/nieuw',
    name: 'ThemeCreate',
    component: ThemeForm,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Nieuwe thema'
    }
  },
  {
    path: '/themas/:themeId/edit',
    name: 'ThemeEdit',
    component: ThemeForm,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Thema'
    }
  },
  // Building blocks
  {
    path: '/bouwblokken/nieuw',
    name: 'BuildingBlockCreate',
    component: BuildingBlockForm,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Nieuwe bouwblok'
    }
  },
  {
    path: '/bouwblokken/:buildingBlockId/edit',
    name: 'BuildingBlockEdit',
    component: BuildingBlockForm,
    meta: {
      title: 'Bouwblok'
    }
  },
  {
    path: '/bouwblokken',
    name: 'BuildingBlockOverview',
    component: BuildingBlockOverview,
    meta: {
      title: 'Bouwblokken'
    }
  },
  // Categories
  {
    path: '/categorieen/nieuw',
    name: 'CategoryCreate',
    component: CategoryBlockForm,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Nieuwe categorie'
    }
  },
  {
    path: '/categorieen/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryBlockForm,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Categorie'
    }
  },
  {
    path: '/categorieen',
    name: 'CategorieesOverview',
    component: CategoryBlockOverview,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Categorieën'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
