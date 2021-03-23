<template>
  <b-col cols="12" v-if="!loading">
    <b-row class="bg-white shadow">
      <b-col cols="12 py-3 d-flex position-sticky bg-primary justify-content-between border border-left-0 border-top-0 border-right-0">
        <h2 class="d-inline-block text-left text-info">
          {{ result.title }}
        </h2>
        <b-button
          v-show='can("workshops.change_buildingblocktemplate")'
          :to="{name: 'BuildingBlockEdit', params: { buildingBlockId: result.id }}"
          variant="info">
            <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
            bewerken
        </b-button>
      </b-col>
      <b-col cols="12" class="text-left my-3 ml-n2">
          <time-badge :time='result.duration' />
          <b-badge v-if='result.theme' pill variant="secondary" class="mt-2 mx-3">{{ result.theme.title }}</b-badge>
          <b-badge v-if='result.category' pill variant="secondary" class="mt-2 mx-3">{{ result.category.title }}</b-badge>
          <status-badge v-if="can('workshops.publish_buildingblocktemplate')" :status='result.BuildingblockStatus' />
          <sensitive-badge v-show='result.isSensitive' />
        </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="12">
            <created-by :createdBy='result.createdBy' />
            <span class="w-100 h6 text-left d-inline-block" v-if="result.approvingTeam && can('workshops.view_field_created_by_workshop')">Gepubliceerd door {{ result.approvingTeam.title }}</span>
          </b-col>
          <b-col cols="12" class="text-left mt-4" >
            <ckeditor-view :content='result.description' />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
     <b-row class="bg-white shadow mt-3" id='necessities'>
        <custom-collapse
          id='benodigdheden'
          title='Benodigdheden'
          :visible="true"
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
      <div class="text-right mt-3">
        <b-button
          v-show='can("workshops.change_buildingblocktemplate")'
          :to="{name: 'BuildingBlockEdit', params: { buildingBlockId: result.id }}"
          variant="info">
            <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
            bewerken
        </b-button>
      </div>
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
import useToast from '@/composables/useToast'
import CreatedBy from '../../components/semantic/createdBy.vue'
import SensetiveBadge from '../../components/semantic/sensitiveBadge.vue'

export default defineComponent({
  props: {
    workshopId: String
  },
  components: {
    TimeBadge,
    statusBadge,
    customCollapse,
    ckeditorView,
    CreatedBy,
    'sensitive-badge': SensetiveBadge
  },
  setup (props, { emit, root }) {
    const { route, router } = useRouter()
    const { can } = usePermissions()
    const toast = useToast(root)
    const { loading, doCallWithLoginRetry, result } = useRepository(BuildingBlocksRepository, callTypes.getSingel, { id: route.value.params.buildingBlockId })

    doCallWithLoginRetry('bouwblokken/' + route.value.params.buildingBlockId).catch(() => {
      toast.send('U kan deze bouwsteen niet bekijken', 'danger')
      router.push({ name: 'WerkwinkelOverview' })
    })


    return {
      result,
      loading,
      can
    }
  }
})
</script>


