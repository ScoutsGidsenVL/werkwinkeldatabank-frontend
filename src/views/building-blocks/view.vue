<template>
  <div>
    <b-col cols="12" class="custom-padding" v-if="!loading && result">
      <b-row class="bg-white">
        <b-col cols="12 py-3 d-flex flex-md-row flex-column position-sticky justify-content-between border border-left-0 border-top-0 border-right-0">
          <h2 class="d-inline-block text-left text-dark">
            {{ result.title }}
          </h2>
          <router-link :to="{name: 'BuildingBlockEdit', params: { buildingBlockId: result.id }}" >
            <b-button
              v-show='can("workshops.change_buildingblocktemplate")'
              variant="primary">
                <b-icon icon="pencil-square" aria-label="edit" class="mx-2"></b-icon>
                bewerken
            </b-button>
          </router-link>
        </b-col>
        <b-col cols="11" class="d-flex flex-md-row flex-column text-left py-3">
            <time-badge class="my-1 mx-1 fit" :time='result.duration' />
            <b-badge v-if='result.theme' pill variant="secondary" class="fit my-1 mx-1">{{ result.theme.title }}</b-badge>
            <b-badge v-if='result.category' pill variant="secondary" class="my-1 mx-1">{{ result.category.title }}</b-badge>
            <status-badge class="my-1 mx-1 fit" v-if="can('workshops.publish_buildingblocktemplate')" :status='result.BuildingblockStatus' />
            <sensitive-badge class="my-1 mx-1 fit" v-show='result.isSensitive' />
          </b-col>
        <b-col cols="12">
          <b-row>
            <b-col cols="12">
              <created-by :createdBy='result.createdBy' />
              <span class="w-100 h6 text-left d-inline-block" v-if="result.approvingTeam && can('workshops.view_field_created_by_workshop')">Gepubliceerd door ploeg {{ result.approvingTeam.title }}</span>
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
    </b-col>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
import { useRouter } from '../../composables/useRouter'
import useRepository, { callTypes } from '../../composables/useRepository'
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

    doCallWithLoginRetry('bouwblokken/' + route.value.params.itemTitle + '/' + route.value.params.buildingBlockId).catch(() => {
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

<style lang='scss' scoped>
  .action-bar{
    bottom: 0;
    z-index: 9;
  }
  .sticky-container {
    max-width: none;
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
