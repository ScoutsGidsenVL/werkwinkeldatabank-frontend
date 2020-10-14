<template>
<base-overview
    :repo='ThemeRepository'
    :filtersProp='filters'
    label="thema"
    createRoute="ThemeCreate"
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
    </template>
    <template #content='{ results }'>
      <b-row
        v-for="theme in results"
        class="border border-left-0 border-top-0 border-right-0 p-4"
        :key='theme.id'>
        <b-col
          cols='10'
        >
            {{ theme.title }}
            <disabled-badge  v-show='theme.isDisabled && can("scouts_auth.access_disabled_entities")' />
        </b-col>
        <b-col
          cols='2'
          class="text-right">
             <router-link :to="{name: 'ThemeEdit', params: { themeId: theme.id }}"  >
                bewerken
            </router-link>
        </b-col>
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ThemeRepository from '../../repositories/entities/themeRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import DisabledBadge from '../../components/semantic/disabledBadge.vue'
import usePermissions from '@/composables/usePermissions'

export default defineComponent({
  name: 'themes-overview',
  components: {
    BaseOverview,
    TextInput,
    'disabled-badge': DisabledBadge
  },
  setup () {
    const filters : any = {
      term: { type: 'string', value: undefined, filterKey: 'term' }
    }
    const { can } = usePermissions()

    return {
      ThemeRepository,
      filters,
      inputTypes,
      can
    }
  }
})
</script>
