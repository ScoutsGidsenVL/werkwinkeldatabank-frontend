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

        <b-col cols="12" lg='4' v-show="filters.type.value === 'THEMATIC'">
              <select-input
                label='Thema'
                id="theme"
                :rules='{}'
                :multiple='true'
                :repo='ThemeRepository'
                v-model="filters.theme.value"
              />
            </b-col>
            <b-col cols="12" lg='4' v-show="filters.type.value === 'METHODIC'">
              <select-input
                label='Soort werkvorm'
                id="category"
                :rules='{}'
                :multiple='true'
                :repo='CategoriesRepository'
                v-model="filters.category.value"
              />
            </b-col>

       <b-col
        v-if="can('workshops.publish_buildingblocktemplate') && !isReadyForPublictionOverview"
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
          class="mt-2 mb-2"
          v-model="filters.createdBy.value"
          :value="myId">
              Mijn bouwstenen
          </b-form-checkbox>
        </b-col>
    </template>
    <template #content='{ results }'>
      <div style="padding-left:1.5em;padding-right:1.5em">
        <b-col cols="12">
          <router-link
              v-for="block in results"
              :key='block.id'
              class="text-body building-block-item-link"
              :to="{name: 'BuildingBlockView', params: { buildingBlockId: block.id }}"  >
            <building-block-item
              :showStatus="can('workshops.publish_buildingblocktemplate')"
              :block='block'>
              <router-link :to="{name: 'BuildingBlockView', params: { buildingBlockId: block.id }}">
                <b-button variant="primary text-dark">
                  Bekijken
                </b-button>
              </router-link>
            </building-block-item>
        </router-link>
        </b-col>
      </div>
    </template>
  </base-overview>
</template>

<script lang="ts">
import PrivateBuildingBlocskRepository from '../../repositories/entities/privateBuildingBlocskRepository'
import BuildingBlocskRepository from '../../repositories/entities/buildingBlocskRepository'
import BlockStatusRepository from '../../repositories/entities/blockStatusRepository'
import CategoriesRepository from '../../repositories/entities/categoriesRepository'
import { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import { transitionTypes } from '../../repositories/withTransitionRepository'
import BlockStatusEntityModel from '@/models/entities/blockStatusEntityModel'
import BuildingBlockItem from '../../components/list/buildingBlockItem.vue'
import ThemeRepository from '../../repositories/entities/themeRepository'
import EnumTypeFilter from '../../components/filters/enumTypeFilter.vue'
import DurationFilter from '../../components/filters/durationFilter.vue'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import { defineComponent, ref } from '@vue/composition-api'
import usePermissions from '@/composables/usePermissions'
import store from '@/store/store'


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
  props: {
    isReadyForPublictionOverview: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    window.scrollTo(0, 0)
    const status = ref<any>(undefined)

    if (props.isReadyForPublictionOverview) {
      status.value = new BlockStatusEntityModel('Publicatie aangevraagd', 'PUBLICATION_REQUESTED', 'PUBLICATION_REQUESTED')
    }

    const filters = ref<Object>({
      type: { type: 'string', value: undefined, filterKey: 'type' },
      term: { type: 'string', value: undefined, filterKey: 'term' },
      duration: { type: 'objectString', value: undefined, filterKey: 'duration' },
      status: { type: 'entity', value: status.value, filterKey: 'status' },
      createdBy: { type: 'string', value: undefined, filterKey: 'created_by' },
      theme: { type: 'arrayEntity', value: undefined, filterKey: 'theme' },
      category: { type: 'arrayEntity', value: undefined, filterKey: 'category' }
    })
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
