<template>
  <base-overview
    :filtersProp="{theme: { type: 'arrayEntity', value: undefined },term: { type: 'string', value: undefined }}"
    :repo='WorkshopRepository'
    label="werkwinkel"
    createRoute="WerkwinkelCreate"
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
        />
      </b-row>
    </template>
</base-overview>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import WorkshopRepository from '../../repositories/workshopRepository'
import WorkshopItem from '../../components/list/workshopItem.vue'
import ThemeRepository from '../../repositories/themeRepository'
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
  setup () {
    const filters : any = {
      theme: { type: 'arrayEntity', value: undefined },
      term: { type: 'string', value: undefined }
    }

    return {
      filters,
      WorkshopRepository,
      ThemeRepository,
      inputTypes
    }
  }
})
</script>
