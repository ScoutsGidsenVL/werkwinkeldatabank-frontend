<template>
  <b-col cols="12" md='6' lg='6' class="workshop-item mb-3">
    <router-link class="nav-link text-body" :to="{name: 'WerkwinkelView',  params: { itemTitle: getSluggedTitle(workshop.title) ,workshopId: workshop.id }}" >
      <b-row class="py-4 m-2 bg-light">
          <b-col cols="12" class="text-center text-dark mb-2">
              <strong>{{ workshop.title }}</strong>
          </b-col>
          <b-col cols="12" class="d-flex flex-row flex-wrap align-items-center justify-content-center text-center justify-content-center">
            <time-badge class="my-1 mx-2 fit" v-show='workshop.duration' :time='workshop.duration' />
            <status-badge class="my-1 mx-2 fit" v-if="showStatus" :status='workshop.workshopStatus' />
            <b-badge class="my-1 mx-2 fit" v-for="theme in workshop.theme" :key='theme.id' pill variant="secondary">{{ theme.title }}</b-badge>
            <sensitive-badge class="my-1 mx-2 fit" v-show='workshop.isSensitive' />
            <disabled-badge class="my-1 mx-2 fit" v-show='workshop.isDisabled && can("scouts_auth.access_disabled_entities")' />
          </b-col>

          <b-col style="font-size: 14px" v-if="can('workshops.view_history')" cols="12" class="mt-3 text-center d-flex justify-content-center">
            Gepubliceerd op {{ workshop.publishedAt }}
          </b-col>

          <b-col
            cols="12"
            class="text-center mt-2"
            v-html='workshop.shortDescription' />
          <b-col cols="12" class="text-center d-flex justify-content-center align-items-end">
            <router-link class="nav-link" :to="{name: 'WerkwinkelView',  params: { itemTitle: getSluggedTitle(workshop.title) ,workshopId: workshop.id }}" >
              <b-button variant="primary text-dark">Bekijken</b-button>
            </router-link>
          </b-col>
      </b-row>
    </router-link>
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
import { useSlugify } from '../../helpers/slugHelper'


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
    const { getSluggedTitle } = useSlugify()

    return {
      can,
      getSluggedTitle
    }
  }
})
</script>

<style lang='scss' scoped>
  @import 'src/assets/variables.scss';
  .workshop-item>a>div{
    border-bottom: 4px solid $secondary;
  }

  .workshop-item>a,
  .workshop-item>a>div{
    height: 100%;
  }

</style>
