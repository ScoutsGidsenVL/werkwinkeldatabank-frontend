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
import PublishedWorkshopRepository from './repositories/publishedWorkshopRepository'
import MyWorkshopRepository from './repositories/myWorkshopRepository'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
      workshopReposioryType: MyWorkshopRepository
    },
    meta: {
      title: 'Mijn werkwinkels'
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
      title: 'Werkwinkel bewerken'
    }
  },
  // Themes
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
  // Building blocks
  {
    path: '/bouwblokken/nieuw',
    name: 'BuildingBlockCreate',
    component: BuildingBlockForm,
    meta: {
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
      title: 'Nieuwe categorie'
    }
  },
  {
    path: '/categorieen/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryBlockForm,
    meta: {
      title: 'Categorie'
    }
  },
  {
    path: '/categorieen',
    name: 'CategorieesOverview',
    component: CategoryBlockOverview,
    meta: {
      title: 'Categorieën'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
