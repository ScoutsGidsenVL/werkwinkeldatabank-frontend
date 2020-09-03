<template>
  <b-col cols="12" v-if="!loading">
      <b-row class="bg-white">
        <b-col cols="12 py-3 d-flex justify-content-between border border-left-0 border-top-0 border-right-0">
          <h2 class="d-inline-block">{{ result.title }}</h2>
          <b-button
            :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id }}"
            variant="outline-dark">
             <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
             edit
          </b-button>
        </b-col>
        <b-col cols="12" class="text-left my-3">
          <time-badge>{{ result.duration }}</time-badge>
          <b-badge pill variant="secondary" class="mt-2 ml-3">{{ result.theme.title }}</b-badge>
          <b-badge v-show='result.isSensitive' pill variant="info" class="mt-2 ml-3">Gevoelige inhoud</b-badge>
        </b-col>
        <b-col cols="12" >
            <b-row>
                <b-col cols="12" class="text-left mt-4"><strong>Benodigdheden:</strong></b-col>
                <b-col cols="12" class="text-left mt-2" v-html='result.necessities' />
            </b-row>
        </b-col>
        <b-col cols="12">
            <b-row>
              <b-col cols="12" class="text-left mt-4"><strong>Omschrijving:</strong></b-col>
              <b-col cols="12" class="text-left mt-4" v-html='result.description' />
            </b-row>
        </b-col>
      </b-row>

      <b-row
        v-for="(block) in result.buildingBlocks"
        :key='block.id'
        class="bg-white my-3 py-3">
        <b-col cols="12" class="text-left">
          <h3>{{ block.title }}</h3>
        </b-col>
        <b-col class="text-left" cols="12" v-html="block.description" />
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
import TimeBadge from '../../components/semantic/timeBadge.vue'

export default defineComponent({
  props: {
    workshopId: String
  },
  components: {
    TimeBadge
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

<style lang='scss' scoped>

::v-deep .badge.badge-pill{
  font-size: 14px;
  padding: 0.75rem 1.5rem;
}

</style>
