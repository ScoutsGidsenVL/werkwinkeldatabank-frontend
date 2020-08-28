<template>
  <b-col cols="12" md='6' lg='4'>
    <b-row class="py-4 m-2 border">
        <b-col cols="12" class="text-center">
            {{ workshop.title }}
        </b-col>
        <b-col
          cols="12"
          class="text-center mt-2"
          v-html='workshop.description' />
        <b-col cols="12" class="text-center">
          <router-link class="nav-link" :to="{name: 'WerkwinkelView',  params: { workshopId: workshop.id }}" >
            <b-button>View</b-button>
          </router-link>
        </b-col>
    </b-row>
  </b-col>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'

export default defineComponent({
  name: 'workshop-item',
  props: {
    workshop: Object as PropType<WorkshopEntityModel>
  }
})
</script>
