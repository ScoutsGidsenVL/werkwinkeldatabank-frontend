<template>
  <base-overview
    :repo="BuildingBlocskRepository"
    :filtersProp="filters"
    label="bouwsteen"
    :showFilters="selectedBlock ? false : true"
  >
    <template #filters="{ filters }">
      <b-col cols="8">
        <b-row>
          <b-col cols="12" lg="6">
            <text-input
              v-model="filters.term.value"
              label="Zoek"
              :rules="{}"
              id="title"
              :type="inputTypes.text"
            />
          </b-col>
          <b-col cols="12" lg="6">
            <select-input
              label="Type"
              id="type"
              v-model="filters.type.value"
              :options="types"
              :multiple="false"
            />
          </b-col>
        </b-row>
      </b-col>
    </template>
    <template #content="{ results }">
      <building-block-item
        v-show="!selectedBlock"
        v-for="block in results"
        :block="block"
        :key="block.id"
      >
        <a href v-on:click.prevent="moreInfo(block.id)">Meer info ></a>
      </building-block-item>
      <b-row v-show="selectedBlock" class="p-3">
        <b-col cols="12" class="text-left">
          <h2>{{ selectedBlock && selectedBlock.title }}</h2>
        </b-col>
        <b-col cols="12" class="text-left mb-3">
          <b-badge
            pill
            variant="light"
            class="mt-2 mr-2"
          >{{ selectedBlock && selectedBlock.category.title }}</b-badge>
          <b-badge pill variant="secondary" class="mt-2">{{ selectedBlock && selectedBlock.type }}</b-badge>
          <time-badge>{{ selectedBlock && selectedBlock.duration }}</time-badge>
        </b-col>
        <b-col cols="12" class="text-left" v-html="selectedBlock && selectedBlock.description" />
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/buildingBlocskRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import useRepository, { callTypes } from '@/composables/useRepository'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlockItem from '../list/buildingBlockItem.vue'
import TimeBadge from '../semantic/timeBadge.vue'

export default defineComponent({
  name: 'select-building-block',
  components: {
    BaseOverview,
    TextInput,
    SelectInput,
    BuildingBlockItem,
    TimeBadge
  },
  props: {
    value: Object as PropType<BaseEntityModel>
  },
  setup (props, { emit }) {
    const selectedBlock = ref<BaseEntityModel | undefined>(props.value)
    const filters: any = {
      type: { type: 'string', value: undefined },
      term: { type: 'string', value: undefined }
    }
    const types: String[] = BuildingBlocksEntityModel.getTypesArray()

    watch(
      () => props.value,
      () => {
        selectedBlock.value = props.value
      }
    )

    const moreInfo = async (id: string) => {
      const { loading, doCall, result } = useRepository(
        BuildingBlocskRepository,
        callTypes.getSingel,
        {
          id: id
        }
      )

      await doCall()
      selectedBlock.value = result.value
      emit('input', selectedBlock.value)
    }

    const goBack = () => {
      selectedBlock.value = undefined
    }

    return {
      BuildingBlocskRepository,
      moreInfo,
      goBack,
      selectedBlock,
      types,
      inputTypes,
      filters
    }
  }
})
</script>
