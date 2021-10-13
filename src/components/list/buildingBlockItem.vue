<template>
    <b-row
    class="building-block-item mb-3 bg-light py-4 p-3"
    >
    <b-col
        cols='12'
    >
        <strong class="d-inline-block mb-1">{{ block.title }}</strong>
        <div v-show="block.shortDescription" class="mb-1 d-inline-block w-100" v-html='block.shortDescription' />
        <a v-if="readMore" href='#' class="w-100 d-inline-block mb-2 mt-1 text-body text-underline">lees meer ></a>
    </b-col>
    <div class="d-flex flex-sm-row flex-column w-100">
      <b-col
        v-show="!hideInfo"
        :class='hideInfo ? "" : "d-flex justify-content-left"'
        class="d-flex flex-sm-row flex-column"
      >
          <b-badge class="mr-sm-2 mb-1 mb-sm-0" pill variant="secondary">{{ block.type }}</b-badge>
          <time-badge class="mr-sm-2 mb-1 mb-sm-0" :time='block.duration' />
          <b-badge class="mr-sm-2 mb-1 mb-sm-0" v-if="block.category" pill variant="secondary">{{ block.category.title }}</b-badge>
          <b-badge class="mr-sm-2 mb-1 mb-sm-0" v-if="block.theme" pill variant="secondary">{{ block.theme.title }}</b-badge>
          <sensitive-badge class="mr-sm-2 mb-1 mb-sm-0" v-show='block.isSensitive' />
          <disabled-badge class="mr-sm-2 mb-1 mb-sm-0" v-show='block.isDisabled && can("scouts_auth.access_disabled_entities")' />
          <status-badge class="mr-sm-2 mb-1 mb-sm-0" v-if="showStatus" :status='block.BuildingblockStatus' />
      </b-col>
      <b-col class="text-sm-right text-center">
          <slot />
      </b-col>
    </div>
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
  @import 'src/assets/variables.scss';
  .building-block-item {
    border-bottom: 4px solid $secondary;
  }
</style>
