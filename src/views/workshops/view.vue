<template>
  <b-col cols="12" v-if="!loading">
      <b-row class="bg-white shadow">
        <b-col cols="12 py-3 d-flex position-sticky bg-primary justify-content-between border border-left-0 border-top-0 border-right-0">
          <h2 class="d-inline-block text-left text-info">
            {{ result.title }}
          </h2>
          <div class="d-block">
            <b-button
              v-show='can("workshops.change_workshop")'
              class="mr-2"
              v-on:click.prevent='DownloadPDF(result)'
              variant="info">
              <b-icon icon="cloud-download" aria-label="download" class="mx-2 mt-2"></b-icon>
              download
            </b-button>
            <b-button
              v-show='can("workshops.change_workshop")'
              class="mr-2"
              :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id, copy: true }}"
              variant="info">
              <b-icon icon="files" aria-label="kopieer" class="mx-2 mt-2"></b-icon>
              kopieer
            </b-button>
            <b-button
              v-show='(can("workshops.change_workshop") && result.isMine) || can("workshops.change_all_workshop")'
              :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id }}"
              variant="info">
              <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
              bewerken
            </b-button>
          </div>
        </b-col>
        <b-col cols="12" class="text-left my-3 ml-n2 d-flex justify-content-left">
          <time-badge :time='result.duration' />
          <b-badge pill variant="secondary" class="mt-2 mx-3">{{ result.theme.title }}</b-badge>
          <status-badge v-if="can('workshops.change_workshop')" :status='result.workshopStatus' />
          <b-badge v-show='result.isSensitive && can("workshops.view_field_is_sensitive_workshop")' pill variant="info" class="mt-2 ml-3">Gevoelige inhoud</b-badge>
        </b-col>

        <b-col cols="12">
            <b-row>
              <b-col cols="12">
                <created-by :createdBy='result.createdBy' />
                <span class="w-100 h6 text-left d-inline-block" v-if="result.approvingTeam && can('workshops.change_buildingblocktemplate')">Gepubliceerd door {{ result.approvingTeam.title }}</span>
              </b-col>
              <b-col cols="12" class="text-left mt-4" >
                <ckeditor-view :content='result.description' />
              </b-col>
              <b-col cols="12" class="text-left mt-2 mb-5">
                <a
                  class='d-inline-block'
                  href='#'
                  v-on:click.prevent='goToNecessities()'>
                  bekijk benodigdheden
                </a>
              </b-col>
            </b-row>
        </b-col>
      </b-row>

      <b-row
        v-for="(block) in result.buildingBlocks"
        :key='block.id'
        class="bg-white shadow my-3 py-0">
        <custom-collapse
          :id='block.id'
          :title='block.title'
          :visible="true"
        >
           <div class="w-100 py-2 px-3" >
             <div class="text-left pl-0 d-inline-block w-100 mt-2 mb-3 ml-n3">
              <time-badge :time='block.duration' />
             </div>
              <ckeditor-view :content='block.description' />
            </div>
        </custom-collapse>
      </b-row>
      <b-row class="bg-white shadow"  id='necessities'>
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
                <b-col cols="12" class="text-left mt-4">Extra benodigdheden:<br><div v-html='result.necessities' /></b-col>
            </b-row>
        </custom-collapse>
      </b-row>
  </b-col>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
import { useRouter } from '../../composables/useRouter'
import useRepository, { callTypes } from '../../composables/useRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import { PropType } from 'vue'
import WorkshopRepository from '../../repositories/entities/workshopRepository'
import TimeBadge from '../../components/semantic/timeBadge.vue'
import usePermissions from '@/composables/usePermissions'
import statusBadge from '../../components/semantic/statusBadge.vue'
import customCollapse from '../../components/semantic/customCollapse.vue'
import ckeditorView from '../../components/semantic/ckeditorView.vue'
import useToast from '@/composables/useToast'
import useDownload from '../../composables/useDownload'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CreatedBy from '../../components/semantic/createdBy.vue'

export default defineComponent({
  props: {
    workshopId: String
  },
  components: {
    TimeBadge,
    statusBadge,
    customCollapse,
    ckeditorView,
    CreatedBy
  },
  setup (props, { emit, root }) {
    const { route, router } = useRouter()
    const { can } = usePermissions()
    const toast = useToast(root)
    const { loading, doCall, result } = useRepository(WorkshopRepository, callTypes.getSingel, { id: route.value.params.workshopId })
    const necessitiesOpen = ref<Boolean>(true)
    const { DownloadFile } = useDownload()

    doCall().catch(() => {
      toast.send('U kan deze werkwinkel niet bekijken', 'danger')
      router.push({ name: 'WerkwinkelOverview' })
    })

    root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (collapseId === 'accordion-benodigdheden') {
        necessitiesOpen.value = isJustShown
      }
    })

    const goToNecessities = () => {
      !necessitiesOpen.value && root.$emit('bv::toggle::collapse', 'accordion-benodigdheden')
      root.$scrollTo('#necessities')
    }

    const DownloadPDF = (workshop: WorkshopEntityModel) => RepositoryFactory.get(WorkshopRepository).getDownload(workshop).then((repsonse: any) => DownloadFile(repsonse, 'test.pdf'))

    return {
      result,
      loading,
      can,
      goToNecessities,
      DownloadPDF
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
