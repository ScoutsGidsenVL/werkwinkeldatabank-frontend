<template>
  <base-overview
    :filtersProp="{theme: { type: 'arrayEntity', value: undefined },term: { type: 'string', value: undefined }}"
    :repo='workshopReposioryType'
    label="werkwinkel"
    :createRoute="createRoute"
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
          label='Thema'
          id="theme"
          :rules='{}'
          :multiple='true'
          :repo='ThemeRepository'
          v-model="filters.theme.value"
        />
      </b-col>
    </template>
    <template #content='{ results }'>
      <b-row class="pb-5">
        <workshop-item
          v-for="workshop in results"
          :key='workshop.id'
          :workshop='workshop'
          :showStatus="showStatus"
        />
      </b-row>
    </template>
</base-overview>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import WorkshopRepository from '../../repositories/entities/workshopRepository'
import WorkshopItem from '../../components/list/workshopItem.vue'
import ThemeRepository from '../../repositories/entities/themeRepository'
import SelectInput from '../../components/inputs/selectInput.vue'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import BaseOverview from '../../components/base-views/baseOverview.vue'


export default defineComponent({
  name: 'workshop-overview',
  components: {
    BaseOverview,
    WorkshopItem,
    SelectInput,
    TextInput
  },
  props: {
    workshopReposioryType: {
      type: Function as PropType<new (...params: any[]) => WorkshopRepository>,
      required: true,
      default: WorkshopRepository
    },
    showCreate: {
      type: Boolean,
      default: true
    }
  },
  setup ({ showCreate }) {
    const filters : any = {
      theme: { type: 'arrayEntity', value: undefined },
      term: { type: 'string', value: undefined }
    }

    const createRoute = showCreate ? 'WerkwinkelCreate' : ''
    const showStatus = showCreate

    return {
      filters,
      ThemeRepository,
      inputTypes,
      createRoute,
      showStatus
    }
  }
})
</script>
