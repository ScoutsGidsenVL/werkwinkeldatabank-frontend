<template>
<b-col cols="12">
  <b-row>
    <b-col cols="12"  class="text-right">
      <router-link :to="{name: 'WerkwinkelCreate'}" >
        + nieuwe werkwinkel aanmaken
      </router-link>
    </b-col>
    <b-col cols="12" class="text-left mt-3">
      <b-row>
        <workshop-item
          v-for="workshop in result"
          :key='workshop.id'
          :workshop='workshop'
        />
      </b-row>
    </b-col>
  </b-row>
</b-col>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useRepository from '../../composables/useRepository'
import WorkshopRepository from '../../repositories/workshopRepository'
import WorkshopItem from '../../components/list/workshopItem.vue'

export default defineComponent({
  name: 'werkwinkels-overview',
  components: {
    'workshop-item': WorkshopItem
  },
  setup () {
    const { loading, doCall, result } = useRepository(WorkshopRepository)

    doCall()

    return {
      result
    }
  }
})
</script>
