<template>
  <b-col cols="12" v-if="!loading">
    <b-row class="bg-white">
      <b-col cols="12 py-3 d-flex position-sticky bg-white justify-content-between border border-left-0 border-top-0 border-right-0">
        <h2 class="d-inline-block text-left">
          {{ result.title }}
        </h2>
        <b-button
          v-show='can("workshops.change_workshop")'
          :to="{name: 'BuildingBlockEdit', params: { buildingBlockId: result.id }}"
          variant="outline-dark">
            <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
            bewerken
        </b-button>
      </b-col>
      <b-col cols="12" class="text-left my-3 ml-n2">
          <time-badge :time='result.duration' />
          <b-badge v-if='result.theme' pill variant="secondary" class="mt-2 mx-3">{{ result.theme.title }}</b-badge>
          <b-badge v-if='result.category' pill variant="secondary" class="mt-2 mx-3">{{ result.category.title }}</b-badge>
          <status-badge v-if="can('workshops.change_workshop')" :status='result.workshopStatus' />
          <b-badge v-show='result.isSensitive && can("workshops.change_buildingblocktemplate")' pill variant="info" class="mt-2 ml-3">Gevoelige inhoud</b-badge>
        </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="12">
            <span class="w-100 h6 text-left d-inline-block" v-if="result.createdBy && can('workshops.change_buildingblocktemplate')">Gemaakt door: {{ result.createdBy.firstName }} {{ result.createdBy.lastName }}</span>
            <span class="w-100 h6 text-left d-inline-block" v-if="result.approvingTeam && can('workshops.change_buildingblocktemplate')">Gepubliceerd door {{ result.approvingTeam.title }}</span>
          </b-col>
          <b-col cols="12" class="text-left mt-4" >
            <ckeditor-view :content='result.description' />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
     <b-row class="bg-white mt-3" id='necessities'>
        <custom-collapse
          id='benodigdheden'
          title='Benodigdheden'
        >
            <b-row class="py-2 px-3">
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
        </custom-collapse>
      </b-row>
  </b-col>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
import { useRouter } from '../../composables/useRouter'
import useRepository, { callTypes } from '../../composables/useRepository'
import { PropType } from 'vue'
import TimeBadge from '../../components/semantic/timeBadge.vue'
import usePermissions from '@/composables/usePermissions'
import statusBadge from '../../components/semantic/statusBadge.vue'
import customCollapse from '../../components/semantic/customCollapse.vue'
import ckeditorView from '../../components/semantic/ckeditorView.vue'
import BuildingBlocksRepository from '@/repositories/entities/buildingBlocskRepository'

export default defineComponent({
  props: {
    workshopId: String
  },
  components: {
    TimeBadge,
    statusBadge,
    customCollapse,
    ckeditorView
  },
  setup (props, { emit, root }) {
    const { route } = useRouter()
    const { can } = usePermissions()
    const { loading, doCall, result } = useRepository(BuildingBlocksRepository, callTypes.getSingel, { id: route.value.params.buildingBlockId })

    doCall()


    return {
      result,
      loading,
      can
    }
  }
})
</script>


