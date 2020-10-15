<template>
<base-overview
    :repo='repo'
    :filtersProp='filters'
    label="bouwsteen"
    createRoute="BuildingBlockCreate"
  >
    <template #filters='{ filters }'>
      <b-col cols="12" lg="4">
        <text-input
          v-model="filters.term.value"
          label="Zoek"
          :rules='{}'
          id='title'
          :type="inputTypes.text"
        />
      </b-col>
      <block-type-filter v-model="filters.type.value" />
      <duration-filter v-model="filters.duration.value" />
      <b-col cols="12" lg='4'>
        <select-input
          label='Thema'
          id="theme"
          :rules='{}'
          :multiple='true'
          :repo='ThemeRepository'
          v-model="filters.theme.value"
        />
      </b-col>
      <b-col cols="12" lg='4'>
        <select-input
          label='Category'
          id="category"
          :rules='{}'
          :multiple='true'
          :repo='CategoriesRepository'
          v-model="filters.category.value"
        />
      </b-col>
    </template>
    <template #content='{ results }'>
      <building-block-item
        v-for="block in results"
        :block='block'
        :key='block.id'>
        <router-link
          v-show="can('workshops.change_buildingblocktemplate')"
          :to="{name: 'BuildingBlockView', params: { buildingBlockId: block.id }}"  >
            Bekijken
        </router-link>
      </building-block-item>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/entities/buildingBlocskRepository'
import PrivateBuildingBlocskRepository from '../../repositories/entities/privateBuildingBlocskRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import BuildingBlockItem from '../../components/list/buildingBlockItem.vue'
import ThemeRepository from '../../repositories/entities/themeRepository'
import CategoriesRepository from '../../repositories/entities/categoriesRepository'
import BlockTypeFilter from '../../components/filters/blockTypeFilter.vue'
import DurationFilter from '../../components/filters/durationFilter.vue'
import usePermissions from '@/composables/usePermissions'
import { getModule } from 'vuex-module-decorators'
import userModule from '@/store/userModule'
import store from '@/store/store'

export default defineComponent({
  name: 'building-block-overview',
  components: {
    BaseOverview,
    SelectInput,
    TextInput,
    BuildingBlockItem,
    BlockTypeFilter,
    DurationFilter
  },
  setup () {
    const filters : any = {
      type: { type: 'string', value: undefined, filterKey: 'type' },
      term: { type: 'string', value: undefined, filterKey: 'term' },
      duration: { type: 'objectString', value: undefined, filterKey: 'duration' },
      theme: { type: 'arrayEntity', value: undefined, filterKey: 'theme' },
      category: { type: 'arrayEntity', value: undefined, filterKey: 'category' }
    }
    const { can } = usePermissions()

    const repo = store.getters['openid/isLoggedIn'] ? PrivateBuildingBlocskRepository : BuildingBlocskRepository

    return {
      repo,
      inputTypes,
      filters,
      ThemeRepository,
      CategoriesRepository,
      can
    }
  }
})
</script>
