<template>
  <base-overview
    :filtersProp="filters"
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
      <duration-filter
        v-model="filters.duration.value"
        :optionObject='optionObject'
      />
      <b-col cols="12" lg='4'>
        <b-form-checkbox
          v-model="filters.isSensitive.value"
          value="true">
            Gevoelige inhoud
        </b-form-checkbox>
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
import DurationFilter from '../../components/filters/durationFilter.vue'

export default defineComponent({
  name: 'workshop-overview',
  components: {
    BaseOverview,
    WorkshopItem,
    SelectInput,
    TextInput,
    DurationFilter
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
      theme: { type: 'arrayEntity', value: undefined, filterKey: 'theme' },
      term: { type: 'string', value: undefined, filterKey: 'term' },
      duration: { type: 'objectString', value: undefined, filterKey: 'duration' },
      isSensitive: { type: 'string', value: undefined, filterKey: 'is_sensitive' }
    }

    const createRoute = showCreate ? 'WerkwinkelCreate' : ''
    const showStatus = showCreate

    const optionObject = {
      'minder dan een uur':
        {
          'id': 'minder dan een uur',
          'duration_start': '00:00:00',
          'duration_end': '01:00:00'
        },
      '1 tot 4 uur':
        {
          'id': '1 tot 4 uur',
          'duration_start': '01:00:00',
          'duration_end': '04:00:00'
        },
      'meer dan 4 uur':
        {
          'id': 'meer dan 4 uur',
          'duration_start': '04:00:00',
          'duration_end': '99:00:00'
        }
    }

    return {
      filters,
      ThemeRepository,
      inputTypes,
      createRoute,
      showStatus,
      optionObject
    }
  }
})
</script>
