<template>
<base-overview
    :repo='ThemeRepository'
    label="thema"
    createRoute="ThemeCreate"
  >
    <template #content='{ results }'>
      <b-row
        v-for="theme in results"
        class="border border-left-0 border-top-0 border-right-0 p-4"
        :key='theme.id'>
        <b-col
          cols='10'
        >
            {{ theme.title }}
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
import ThemeRepository from '../../repositories/themeRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'

export default defineComponent({
  name: 'themes-overview',
  components: {
    BaseOverview
  },
  setup () {
    return {
      ThemeRepository
    }
  }
})
</script>
