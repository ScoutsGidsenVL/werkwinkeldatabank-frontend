<template>
  <base-overview
    :repo="BuildingBlocskRepository"
    :filtersProp="filters"
    label="bouwsteen"
    :filtersInUrlParams='false'
    :showFilters="selectedBlock ? false : true"
  >
    <template #filters="{ filters }">
      <b-col cols="12">
        <b-row>
            <b-col cols="12" lg="4">
              <text-input
                v-model="filters.term.value"
                label="Zoek"
                :rules='{}'
                id='title'
                :type="inputTypes.text"
              />
            </b-col>
            <enum-filter v-model="filters.type.value" :enumToUse="BuildingBlocksTypes"/>
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
        </b-row>
      </b-col>
    </template>
    <template #content="{ results }">
      <div class="empty-block bg-light">
        <a href
          v-on:click.prevent="moreInfo('', emptyBlock)"
          class="text-body block-item-link"
        >
        <building-block-item
          v-show="!selectedBlock"
          v-if="emptyBlock !== undefined"
          :block="emptyBlock"
          :key="emptyBlock.id"
          :hideInfo="true"
        >
        <a href class='d-inline-block mt-2' v-on:click.prevent="selectBlock('', emptyBlock)">Selecteer ></a>
        </building-block-item>
        </a>
      </div>
      <a href
        v-on:click.prevent="moreInfo(block.id)"
        v-for="block in results"
        :key="block.id"
        class="text-body block-item-link"
        >
        <building-block-item
          v-show="!selectedBlock"
          :block="block"
          :readMore='true'
        >
          <a href class='d-inline-block mt-2' v-on:click.prevent="selectBlock(block.id)">Selecteer ></a>
        </building-block-item>
      </a>
      <b-row v-show="selectedBlock" class="p-3">
        <b-col cols="12" class="text-left">
          <h2>{{ selectedBlock && selectedBlock.title }}</h2>
        </b-col>
        <b-col cols="12" class="text-left mb-3">
          <b-badge
            pill
            variant="light"
            class="mt-2 mr-2"
          >{{ (selectedBlock && selectedBlock.category) && selectedBlock.category.title }}</b-badge>
          <b-badge pill variant="secondary" class="mt-2">{{ selectedBlock && selectedBlock.type }}</b-badge>
          <time-badge v-if="selectedBlock && selectedBlock.duration" :time='selectedBlock.duration' />
          <sensitive-badge v-show='selectedBlock && selectedBlock.isSensitive' />
        </b-col>
        <b-col cols="12" class="text-left" v-html="selectedBlock && selectedBlock.description" />
        <b-col cols="12" class="text-left mt-2"><strong>Benodigdheden</strong></b-col>
        <b-col cols="12" class="text-left" v-html="selectedBlock && selectedBlock.necessities" />
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType, watch } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/entities/privateBuildingBlocskRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import useRepository, { callTypes } from '@/composables/useRepository'
import BuildingBlocksEntityModel, { BuildingBlocksTypes } from '@/models/entities/buildingBlocksEntityModel'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlockItem from '../list/buildingBlockItem.vue'
import TimeBadge from '../semantic/timeBadge.vue'
import EnumTypeFilter from '../../components/filters/enumTypeFilter.vue'
import DurationFilter from '../../components/filters/durationFilter.vue'
import ThemeRepository from '../../repositories/entities/themeRepository'
import CategoriesRepository from '../../repositories/entities/categoriesRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import SensetiveBadge from '../semantic/sensitiveBadge.vue'

export default defineComponent({
  name: 'select-building-block',
  components: {
    BaseOverview,
    TextInput,
    SelectInput,
    BuildingBlockItem,
    TimeBadge,
    'enum-filter': EnumTypeFilter,
    DurationFilter,
    'sensitive-badge': SensetiveBadge
  },
  props: {
    value: Object as PropType<BaseEntityModel>
  },
  setup (props, { emit }) {
    const selectedBlock = ref<BaseEntityModel | undefined>(props.value)
    const filters : any = {
      type: { type: 'string', value: undefined, filterKey: 'type' },
      term: { type: 'string', value: undefined, filterKey: 'term' },
      duration: { type: 'objectString', value: undefined, filterKey: 'duration' },
      theme: { type: 'arrayEntity', value: undefined, filterKey: 'theme' },
      category: { type: 'arrayEntity', value: undefined, filterKey: 'category' }
    }

    const buildingBlockRepo: BuildingBlocskRepository = RepositoryFactory.get(BuildingBlocskRepository)
    const emptyBlock = ref<BuildingBlocksEntityModel | undefined>(undefined)
    buildingBlockRepo.getEmptyBlock().then((emptyBlockreturn: BuildingBlocksEntityModel) => {
      emptyBlock.value = emptyBlockreturn
    })

    watch(
      () => props.value,
      () => {
        selectedBlock.value = props.value
      }
    )

    const moreInfo = async (id: string, EmptyBlock?: BuildingBlocksEntityModel) => {
      if (EmptyBlock) {
        selectedBlock.value = EmptyBlock
      } else {
        const { loading, doCall, result } = useRepository(
          BuildingBlocskRepository,
          callTypes.getSingel,
          {
            id: id
          }
        )

        await doCall()
        selectedBlock.value = result.value

      }
      emit('input', selectedBlock.value)
    }

    const selectBlock = async (id: string, EmptyBlock?: BuildingBlocksEntityModel) => {
      if (EmptyBlock) {
        emit('selectBlock', EmptyBlock)
      } else {
        const { loading, doCall, result } = useRepository(
          BuildingBlocskRepository,
          callTypes.getSingel,
          {
            id: id
          }
        )

        await doCall()
        emit('selectBlock', result.value)
      }

    }



    const goBack = () => {
      selectedBlock.value = undefined
    }

    return {
      BuildingBlocskRepository,
      moreInfo,
      goBack,
      selectedBlock,
      inputTypes,
      filters,
      ThemeRepository,
      CategoriesRepository,
      emptyBlock,
      selectBlock,
      BuildingBlocksTypes
    }
  }
})
</script>

<style lang='scss' scoped>
  .empty-block{
    border-radius: 25px;
    margin-top: 1rem;
    margin-bottom: 1rem;

    a>.row{
      border-bottom: none!important;
    }
  }

  .block-item-link:hover{
    text-decoration: none;
  }
</style>
