<template>
  <b-col cols="12" md='6' lg='4' class="shadow mx-2">
    <b-row class="py-4">
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
import { defineComponent } from '@vue/composition-api'
import { PropType } from 'vue'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'


export default defineComponent({
  props: {
    workshop: Object as PropType<WorkshopEntityModel>
  }
})
</script>
