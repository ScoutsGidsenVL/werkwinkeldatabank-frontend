<template>
  <b-col cols="12" v-if="!loading">
      <b-row>
        <b-col cols="12"  class="text-right">
        <router-link :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id }}" >
         edit
        </router-link>
      </b-col>
        <b-col cols="12" lg="6">
            <b-row class="shadow p-3 text-left">
                <b-col cols="12" class="mb-2">{{ result.title }}</b-col>
                <b-col cols="12">Tijdsduur: {{ result.duration }}</b-col>
                <b-col cols="12">Thema: {{ result.theme.title }}</b-col>
            </b-row>
        </b-col>
        <b-col cols="12" lg="6">
            <b-row>
                <b-col cols="12" v-html='result.description' />
            </b-row>
        </b-col>
      </b-row>
  </b-col>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'
import { useRouter } from '../../composables/useRouter'
import useRepository, { callTypes } from '../../composables/useRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import { PropType } from 'vue'
import WorkshopRepository from '../../repositories/workshopRepository'

export default defineComponent({
  props: {
    workshopId: String
  },
  setup () {
    const { route } = useRouter()
    const { loading, doCall, result } = useRepository(WorkshopRepository, callTypes.getSingel, { id: route.value.params.workshopId })

    doCall()

    return {
      result,
      loading
    }
  }
})
</script>
