<template>
  <div>
  <b-col cols="12" style="padding-bottom:130px" class="custom-padding" v-if="!loading && result">
      <b-row class="bg-white">
        <b-col cols="12 py-3 d-flex position-sticky justify-content-between border border-left-0 border-top-0 border-right-0">
          <h2 class="d-inline-block text-left text-primary">
            {{ result.title }}
          </h2>
          <div class="d-block">
            <b-button
              v-if="BuildingBlocksToPublish.length > 0"
              class="mr-2"
              style="padding-top: 10px;padding-bottom:9px"
              v-on:click.prevent='askPublication()'
              variant="primary">
              Vraag Publicatie Geselecteerde Bouwstenen
            </b-button>
            <b-button
              class="mr-2"
              v-on:click.prevent='DownloadPDF(result)'
              variant="primary">
              <b-icon icon="cloud-download" aria-label="download" class="mx-2 mt-2"></b-icon>
              Download
            </b-button>
            <b-button
              v-b-tooltip.hover title="Log in om je eigen werkwinkels te maken en aan te passen"
              v-if='user.id === undefined'
              class="mr-2"
              v-on:click="login()"
              variant="primary">
              <b-icon icon="pencil-fill" aria-label="login" class="mx-2 mt-2"></b-icon>
              Login
            </b-button>
            <router-link :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id, copy: true }}" >
              <b-button
                v-show='can("workshops.change_workshop")'
                class="mr-2"
                variant="primary">
                <b-icon icon="files" aria-label="kopieer" class="mx-2 mt-2"></b-icon>
                Kopieer
              </b-button>
            </router-link>
            <router-link :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id }}" >
              <b-button
                v-show='(can("workshops.change_workshop") && result.isMine) || can("workshops.change_all_workshop")'
                variant="primary">
                <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
                Bewerken
              </b-button>
            </router-link>
          </div>
        </b-col>
        <b-col cols="11" class="text-left my-3 ml-2 d-flex justify-content-left">
          <time-badge :time='result.duration' />
          <b-badge v-for="theme in result.theme" :key='theme.id' pill variant="secondary" class="ml-2">{{ theme.title }}</b-badge>
          <status-badge v-if="can('workshops.change_workshop')" :status='result.workshopStatus' />
          <sensitive-badge v-show='result.isSensitive' />
        </b-col>

        <b-col cols="12">
            <b-row>
              <b-col cols="12">
                <created-by :createdBy='result.createdBy' />
                <span class="w-100 h6 text-left d-inline-block" v-if="result.approvingTeam">Gepubliceerd door ploeg {{ result.approvingTeam.title }}</span>
                <span class="w-100 h6 text-left d-inline-block" v-if="can('workshops.view_history') && result.publishedAt">Gepubliceerd op {{ result.publishedAt }}</span>
              </b-col>
              <b-col v-if="result.files.length > 0" cols="12" class="mt-5">
                <file-upload :isDetailView="true" :inputFiles="result.files" />
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
        class="bg-white my-3 py-0">
        <custom-collapse
          :id='block.id'
          :title='block.title'
          :visible="true"
        >
          <template v-if="block.type !== 'Inhoud' && can('workshops.request_publication_buildingblocktemplate')" v-slot:header>
              <div class="d-flex flex-row-reverse">
                <b-form-checkbox
                  v-on:change="toggle(block)"
                  class="submit-checkbox"
                  :id="'checkbox-' + block.id"
                  name="checkbox-1"
                >
                Vraag publicatie
                </b-form-checkbox>
              </div>
          </template>
          <div class="w-100 py-2 px-3" >
            <div class="text-left pl-0 d-inline-block w-100 mt-2 mb-3 ml-n3">
            <time-badge :time='block.duration' />
            </div>
            <ckeditor-view :content='block.description' />
          </div>
        </custom-collapse>
      </b-row>
      <b-row class="bg-white"  id='necessities'>
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
  <div
    v-if="!loading && result"
    class="footer"
  >
    <div class="text-right mt-4">
      <b-button
        class="mr-2"
        v-on:click.prevent='DownloadPDF(result)'
        variant="primary">
        <b-icon icon="cloud-download" aria-label="download" class="mx-2 mt-2"></b-icon>
        Download
      </b-button>
      <b-button
        v-b-tooltip.hover title="Log in om je eigen werkwinkels te maken en aan te passen"
        v-if='user.id === undefined'
        class="mr-4"
        v-on:click="login()"
        variant="primary">
        <b-icon icon="pencil-fill" aria-label="login" class="mx-2 mt-2"></b-icon>
        Login
      </b-button>
      <router-link :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id, copy: true }}">
        <b-button
          v-show='can("workshops.change_workshop")'
          class="mr-2"
          variant="primary">
          <b-icon icon="files" aria-label="kopieer" class="mx-2 mt-2"></b-icon>
          Kopieer
        </b-button>
      </router-link>
      <router-link :to="{name: 'WerkwinkelEdit', params: { workshopId: result.id }}">
        <b-button
          class="mr-3"
          v-show='(can("workshops.change_workshop") && result.isMine) || can("workshops.change_all_workshop")'
          variant="primary">
          <b-icon icon="pencil-square" aria-label="edit" class="mx-2 mt-2"></b-icon>
          Bewerken
        </b-button>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
import { useRouter } from '../../composables/useRouter'
import useRepository, { callTypes } from '../../composables/useRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
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
import SensetiveBadge from '../../components/semantic/sensitiveBadge.vue'
import BuildingBlocksRepository from '@/repositories/entities/buildingBlocskRepository'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import moment from 'moment'
import FileUpload from '@/components/semantic/FileUpload.vue'
import userModule from '@/store/userModule'
import store from '@/store/store'
import { getModule } from 'vuex-module-decorators'

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
    'sensitive-badge': SensetiveBadge,
    'file-upload': FileUpload
  },
  setup (props, { emit, root }) {
    const { route, router } = useRouter()
    const { can } = usePermissions()
    const toast = useToast(root)
    const { loading, doCallWithLoginRetry, doCallWithLogin, result } = useRepository(WorkshopRepository, callTypes.getSingel, { id: route.value.params.workshopId })
    const necessitiesOpen = ref<Boolean>(true)
    const { DownloadFile } = useDownload()
    const BuildingBlocksToPublish = ref<Array<BuildingBlocksEntityModel>>([])
    const buildingBlockRepo: BuildingBlocksRepository = RepositoryFactory.get(BuildingBlocksRepository)
    const pdfFileName = ref<string>('default_pdf_name')
    const userStoreModule = getModule(userModule, store)
    const user = ref<any>()

    user.value = userStoreModule.getUser

    const login = () => {
      doCallWithLogin('werkwinkels/' + route.value.params.workshopId)
    }

    const fetchWorkshop = () => {
      doCallWithLoginRetry('werkwinkels/' + route.value.params.workshopId).catch(() => {
        toast.send('U kan deze werkwinkel niet bekijken', 'danger')
        router.push({ name: 'WerkwinkelOverview' })
      })
    }

    fetchWorkshop()

    root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (collapseId === 'accordion-benodigdheden') {
        necessitiesOpen.value = isJustShown
      }
    })

    const goToNecessities = () => {
      !necessitiesOpen.value && root.$emit('bv::toggle::collapse', 'accordion-benodigdheden')
      root.$scrollTo('#necessities')
    }

    const DownloadPDF = (workshop: WorkshopEntityModel) => RepositoryFactory.get(WorkshopRepository).getDownload(workshop).then((repsonse: any) => {
      if (workshop.title) {
        pdfFileName.value = workshop.title.replace(' ', '_').toLowerCase() + '_' + moment().format('YYYY_MM_DD')
      }
      DownloadFile(repsonse, pdfFileName.value)
    })

    const toggle = (block:any) => {
      if (BuildingBlocksToPublish.value.includes(block)) {
        var index = BuildingBlocksToPublish.value.indexOf(block)
        if (index !== -1) {
          BuildingBlocksToPublish.value.splice(index, 1)
        }
      } else {
        BuildingBlocksToPublish.value.push(block)
      }
    }

    const askPublication = (block: any) => {
      BuildingBlocksToPublish.value.forEach(block => {
        let buildingBlock = block
        buildingBlock.id = undefined
        const { doCall, result } = useRepository(BuildingBlocksRepository, callTypes.create, { model: buildingBlock })
        doCall().then(() => {
          // @ts-ignore
          buildingBlockRepo.requestPublication(result.value.id).then(() => {
            toast.send('Publicatie aangevraagd voor:' + result.value?.title, 'success')
          }).catch(() => {
            toast.send('Aanvraging publicatie mislukt voor: ' + result.value?.title, 'danger')
          })
        }).catch(() => {
          toast.send('Aanvraging publicatie mislukt voor: ' + result.value?.title, 'danger')
        })
      })
      BuildingBlocksToPublish.value = []
    }

    return {
      result,
      loading,
      can,
      goToNecessities,
      DownloadPDF,
      BuildingBlocksToPublish,
      toggle,
      askPublication,
      user,
      login
    }
  }
})
</script>

<style lang='scss' scoped>
@import 'src/assets/variables.scss';
::v-deep .badge.badge-pill{
  font-size: 14px;
  padding: 0.75rem 1.5rem;
}

.submit-checkbox {
  position: relative;
  margin-top: -4em;
  top: 5.5em;
  right: 4em;
  cursor: pointer;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $white;
  border-top: 2px solid $secondary;
  color: white;
  text-align: center;
  height: 100px;
}

.row {
  margin-right: 0px;
  margin-left: 0px;
}

.custom-padding {
  padding-right: 0px;
  padding-left: 0px;
}
</style>
