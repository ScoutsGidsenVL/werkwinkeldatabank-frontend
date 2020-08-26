<template>
<base-overview
    :repo='BuildingBlocskRepository'
    label="bouwsteen"
    createRoute="BuildingBlockCreate"
  >
    <template #content='{ results }'>
      <b-row
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
             <router-link :to="{name: 'BuildingBlockEdit', params: { buildingBlockId: block.id }}"  >
                bewerken
            </router-link>
        </b-col>
      </b-row>
    </template>
  </base-overview>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BuildingBlocskRepository from '../../repositories/buildingBlocskRepository'
import BaseOverview from '../../components/base-views/baseOverview.vue'

export default defineComponent({
  name: 'building-block-overview',
  components: {
    BaseOverview
  },
  setup () {
    return {
      BuildingBlocskRepository
    }
  }
})
</script>
