<template>
  <b-col cols="12" v-if="!loading">
      <b-row class="bg-white">
        <b-col cols="12 py-3 d-flex justify-content-between border border-left-0 border-top-0 border-right-0">
          <h2 class="d-inline-block">{{ result.title }}</h2>
          <b-button
            v-show='can("workshops.change_workshop")'
            :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id }}"
            variant="outline-dark">
             <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
             bewerken
          </b-button>
        </b-col>
        <b-col cols="12" class="text-left my-3">
          <time-badge>{{ result.duration }}</time-badge>
          <b-badge pill variant="secondary" class="mt-2 mx-3">{{ result.theme.title }}</b-badge>
          <status-badge v-if="can('workshops.change_workshop')" :status='result.workshopStatus' />
          <b-badge v-show='result.isSensitive && can("workshops.change_buildingblocktemplate")' pill variant="info" class="mt-2 ml-3">Gevoelige inhoud</b-badge>
        </b-col>

        <b-col cols="12">
            <b-row>
              <b-col cols="12" class="text-left mt-4"><strong>Omschrijving:</strong></b-col>
              <b-col cols="12" class="text-left mt-4" v-html='result.description' />
              <b-col cols="12" class="text-left mt-2 mb-5">
                <a
                  class='d-inline-block'
                  href='#'
                  v-scroll-to="'#benodigdheden'">
                  bekijk benodigdheden
                </a>
              </b-col>
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
      <b-row>
        <b-col cols="12" class="bg-white" id='benodigdheden' >
            <b-row>
                <b-col cols="12" class="text-left mt-4"><strong>Benodigdheden:</strong></b-col>
                <b-col
                v-for="(block) in result.buildingBlocks"
                :key='"necessities-"+block.id'
                v-show="block.necessities && block.necessities !== '&nbsp;'"
                  cols="12"
                  class="text-left mt-4"
                  >
                  {{ block.title }}:
                  <br>
                  <div v-html='block.necessities' />
                </b-col>
                <b-col cols="12" class="text-left mt-4">Algemeen:<br><div v-html='result.necessities' /></b-col>
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
import WorkshopRepository from '../../repositories/entities/workshopRepository'
import TimeBadge from '../../components/semantic/timeBadge.vue'
import usePermissions from '@/composables/usePermissions'
import statusBadge from '../../components/semantic/statusBadge.vue'

export default defineComponent({
  props: {
    workshopId: String
  },
  components: {
    TimeBadge,
    statusBadge
  },
  setup () {
    const { route } = useRouter()
    const { can } = usePermissions()
    const { loading, doCall, result } = useRepository(WorkshopRepository, callTypes.getSingel, { id: route.value.params.workshopId })

    doCall()

    return {
      result,
      loading,
      can
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
