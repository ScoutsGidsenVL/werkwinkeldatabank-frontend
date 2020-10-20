<template>
    <b-row
    class="border border-left-0 border-top-0 border-right-0 py-4 p-3"
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
    >
        <b-badge v-if="block.category" pill variant="light" class="mt-2 mr-2">{{ block.category.title }}</b-badge>
        <b-badge pill variant="secondary" class="mt-2">{{ block.type }}</b-badge>
        <time-badge :time='block.duration' />
        <b-badge v-if="block.theme" pill variant="light" class="mt-2 ml-3">{{ block.theme.title }}</b-badge>
        <sensitive-badge v-show='block.isSensitive' />
        <disabled-badge v-show='block.isDisabled && can("scouts_auth.access_disabled_entities")' />
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
    }
  },
  components: {
    TimeBadge,
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
