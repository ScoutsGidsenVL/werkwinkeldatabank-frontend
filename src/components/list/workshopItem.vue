<template>
  <b-col cols="12" md='6' lg='6' class="workshop-item mb-3">
    <b-row class="py-4 m-2 border">
        <b-col cols="12" class="text-center">
            <strong>{{ workshop.title }}</strong>
        </b-col>
        <b-col cols="12" class="text-center">
          <time-badge v-show='workshop.duration' >{{ workshop.duration }}</time-badge>
          <status-badge v-if="showStatus" :status='workshop.workshopStatus' />
          <b-badge pill variant="light" class="mt-2 ml-3">{{ workshop.theme.title }}</b-badge>
          <sensitive-badge v-show='workshop.isSensitive && can("workshops.change_buildingblocktemplate")' />
          <disabled-badge  v-show='workshop.isDisabled && can("scouts_auth.access_disabled_entities")' />
        </b-col>
        <b-col
          cols="12"
          class="text-center mt-2"
          v-html='workshop.shortDescription' />
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
import timeBadge from '../semantic/timeBadge.vue'
import statusBadge from '../semantic/statusBadge.vue'
import usePermissions from '@/composables/usePermissions'
import SensetiveBadge from '../../components/semantic/sensitiveBadge.vue'
import DisabledBadge from '../../components/semantic/disabledBadge.vue'

export default defineComponent({
  name: 'workshop-item',
  props: {
    workshop: Object as PropType<WorkshopEntityModel>,
    showStatus: {
      type: Boolean,
      default: false
    }
  },
  components: {
    timeBadge,
    statusBadge,
    'sensitive-badge': SensetiveBadge,
    'disabled-badge': DisabledBadge
  },
  setup () {
    const { can } = usePermissions()

    return {
      can
    }
  }
})
</script>

<style lang='scss' scoped>
  .workshop-item>div{
    height: 100%;
  }
</style>
