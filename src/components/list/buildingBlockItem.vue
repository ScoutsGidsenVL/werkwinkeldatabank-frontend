<template>
    <b-row
    class="building-block-item mb-3 bg-light py-4 p-3"
    >
    <b-col
        cols='12'
    >
        <strong class="d-inline-block">{{ block.title }}</strong>
        <div v-html='block.shortDescription' />
        <a v-if="readMore" href='#' class="w-100 d-inline-block mb-2 mt-1 text-body text-underline">lees meer ></a>
    </b-col>
    <b-col
        cols="10"
        v-show="!hideInfo"
        class="d-flex justify-content-left"
    >
        <b-badge v-if="block.category" pill variant="secondary" class=" mr-2">{{ block.category.title }}</b-badge>
        <b-badge pill variant="secondary" class="">{{ block.type }}</b-badge>
        <time-badge :time='block.duration' />
        <b-badge v-if="block.theme" pill variant="secondary" class=" ">{{ block.theme.title }}</b-badge>
        <sensitive-badge v-show='block.isSensitive' />
        <disabled-badge v-show='block.isDisabled && can("scouts_auth.access_disabled_entities")' />
        <status-badge v-if="showStatus" :status='block.BuildingblockStatus' />
    </b-col>
    <b-col
        :cols='hideInfo ? 12 : 2'
        class="text-right">
        <slot />
    </b-col>
    </b-row>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@vue/composition-api'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import TimeBadge from '../../components/semantic/timeBadge.vue'
import SensetiveBadge from '../../components/semantic/sensitiveBadge.vue'
import DisabledBadge from '../../components/semantic/disabledBadge.vue'
import usePermissions from '@/composables/usePermissions'
import statusBadge from '../semantic/statusBadge.vue'

export default defineComponent({
  name: 'building-block-item',
  props: {
    block: {
      type: Object as PropType<BuildingBlocksEntityModel>,
      required: true
    },
    hideInfo: {
      type: Boolean,
      default: false
    },
    readMore: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TimeBadge,
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

<style scoped lang='scss'>
  .building-block-item {
    border-bottom: 4px solid #748d26;
  }
</style>
