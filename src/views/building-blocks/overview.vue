<template>
<base-overview
    :repo='repo'
    :filtersProp='filters'
    label="bouwsteen"
    createRoute="BuildingBlockCreate"
    createPermission="workshops.add_buildingblocktemplate"
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
      <enum-filter v-model="filters.type.value" :enumToUse="BuildingBlocksTypes" />
      <duration-filter v-model="filters.duration.value" />
       <b-col
        v-if="can('workshops.publish_buildingblocktemplate')"
        cols="12"
        lg='4'>
        <select-input
          label='Status'
          id="status"
          :rules='{}'
          :multiple='false'
          :repo='BlockStatusRepository'
          v-model="filters.status.value"
        />
      </b-col>
        <b-col cols="12" lg='4'>
        <b-form-checkbox
          v-model="filters.createdBy.value"
          :value="myId">
            Mijn bouwstenen
        </b-form-checkbox>
       </b-col>
    </template>
    <template #content='{ results }'>
      <router-link
          v-for="block in results"
          :key='block.id'
          class="text-body building-block-item-link"
          :to="{name: 'BuildingBlockView', params: { buildingBlockId: block.id }}"  >
        <building-block-item
          :showStatus="can('workshops.publish_buildingblocktemplate')"
          :block='block'>
           <b-button variant="primary text-info"
            :to="{name: 'BuildingBlockView', params: { buildingBlockId: block.id }}"  >
              Bekijken
          </b-button>
        </building-block-item>
       </router-link>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/entities/buildingBlocskRepository'
import PrivateBuildingBlocskRepository from '../../repositories/entities/privateBuildingBlocskRepository'
import BlockStatusRepository from '../../repositories/entities/blockStatusRepository'

import BaseOverview from '../../components/base-views/baseOverview.vue'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import BuildingBlockItem from '../../components/list/buildingBlockItem.vue'
import ThemeRepository from '../../repositories/entities/themeRepository'
import CategoriesRepository from '../../repositories/entities/categoriesRepository'
import EnumTypeFilter from '../../components/filters/enumTypeFilter.vue'
import DurationFilter from '../../components/filters/durationFilter.vue'
import usePermissions from '@/composables/usePermissions'
import { getModule } from 'vuex-module-decorators'
import userModule from '@/store/userModule'
import store from '@/store/store'
import { transitionTypes } from '../../repositories/withTransitionRepository'

export default defineComponent({
  name: 'building-block-overview',
  components: {
    BaseOverview,
    SelectInput,
    TextInput,
    BuildingBlockItem,
    'enum-filter': EnumTypeFilter,
    DurationFilter
  },
  setup () {
    const filters : any = {
      type: { type: 'string', value: undefined, filterKey: 'type' },
      term: { type: 'string', value: undefined, filterKey: 'term' },
      duration: { type: 'objectString', value: undefined, filterKey: 'duration' },
      theme: { type: 'arrayEntity', value: undefined, filterKey: 'status' },
      category: { type: 'arrayEntity', value: undefined, filterKey: 'category' },
      status: { type: 'entity', value: undefined, filterKey: 'status' },
      createdBy: { type: 'string', value: undefined, filterKey: 'created_by' }
    }
    const { can } = usePermissions()
    const isLoggedIn = store.getters['openid/isLoggedIn']
    const repo = isLoggedIn ? PrivateBuildingBlocskRepository : BuildingBlocskRepository

    let myId

    if (isLoggedIn) {
      myId = store.getters['user/getUser'].id
    }

    return {
      repo,
      inputTypes,
      filters,
      ThemeRepository,
      CategoriesRepository,
      BlockStatusRepository,
      BuildingBlocksTypes,
      transitionTypes,
      isLoggedIn,
      myId,
      can
    }
  }
})
</script>

<style lang='scss'>
  .building-block-item-link:hover{
    text-decoration: none;

    strong{
      text-decoration: underline;
    }
  }
</style>
