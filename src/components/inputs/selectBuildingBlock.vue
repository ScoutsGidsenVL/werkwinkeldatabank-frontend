<template>
<base-overview
    :repo='BuildingBlocskRepository'
    :filtersProp='filters'
    label="bouwsteen"
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
      <b-row
        v-show="!selectedBlock"
        v-for="block in results"
        class="border border-left-0 border-top-0 border-right-0 py-3"
        :key='block.id'>
        <b-col
          cols='10'
        >
            {{ block.title }}
        </b-col>
        <b-col
          cols='2'
          class="text-right">
             <a href='' v-on:click.prevent="moreInfo(block.id)">
                Meer info >
             </a>
        </b-col>
      </b-row>
      <b-row v-show="selectedBlock">
          <b-col cols="12">
              <a href='' v-on:click.prevent='goBack'>Back</a>
          </b-col>
          <b-col cols="12" class="text-left">
              <h2>{{ selectedBlock  && selectedBlock.title }}</h2>
          </b-col>
          <b-col cols="12" class="text-left" v-html="selectedBlock && selectedBlock.description"/>
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/buildingBlocskRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import useRepository, { callTypes } from '@/composables/useRepository'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import SelectInput from '../../components/inputs/selectInput.vue'

export default defineComponent({
  name: 'select-building-block',
  components: {
    BaseOverview,
    TextInput,
    SelectInput
  },
  setup (props, { emit }) {
    const selectedBlock = ref<BaseEntityModel | undefined>()
    const filters : any = {
      type: { type: 'string', value: undefined },
      term: { type: 'string', value: undefined }
    }
    const types : String[] = BuildingBlocksEntityModel.getTypesArray()


    const moreInfo = async (id: string) => {
      const { loading, doCall, result } = useRepository(
        BuildingBlocskRepository,
        callTypes.getSingel,
        { id: id }
      )

      await doCall()
      selectedBlock.value = result.value
      emit('input', selectedBlock.value)
    }

    const goBack = () => { selectedBlock.value = undefined }

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
