<template>
<base-overview
    :repo='BuildingBlocskRepository'
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
      <b-col cols="12" lg='4'>
        <select-input
          label='Type'
          id="type"
          v-model="filters.type.value"
          :options='types'
          :multiple='false'
        />
      </b-col>
    </template>
    <template #content='{ results }'>
      <BuildingBlockItem
        v-for="block in results"
        :block='block'
        :key='block.id'>
        <router-link :to="{name: 'BuildingBlockEdit', params: { buildingBlockId: block.id }}"  >
            bewerken
        </router-link>
      </BuildingBlockItem>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/buildingBlocskRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import BuildingBlockItem from '../../components/list/buildingBlockItem.vue'

export default defineComponent({
  name: 'building-block-overview',
  components: {
    BaseOverview,
    SelectInput,
    TextInput,
    BuildingBlockItem
  },
  setup () {
    const filters : any = {
      type: { type: 'string', value: undefined },
      term: { type: 'string', value: undefined }
    }
    const types : String[] = BuildingBlocksEntityModel.getTypesArray()

    return {
      BuildingBlocskRepository,
      inputTypes,
      filters,
      types
    }
  }
})
</script>
