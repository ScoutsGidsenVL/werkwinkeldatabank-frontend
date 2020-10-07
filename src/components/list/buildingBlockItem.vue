<template>
    <b-row
    class="border border-left-0 border-top-0 border-right-0 py-4 p-3"
    >
    <b-col
        cols='12'
    >
        <strong class="d-inline-block">{{ block.title }}</strong>
        <div v-html='block.shortDescription' />
    </b-col>
    <b-col
        cols="10"
        v-show="!hideInfo"
    >
        <b-badge v-if="block.category" pill variant="light" class="mt-2 mr-2">{{ block.category.title }}</b-badge>
        <b-badge pill variant="secondary" class="mt-2">{{ block.type }}</b-badge>
        <time-badge>{{ block.duration }}</time-badge>
        <b-badge v-if="block.theme" pill variant="light" class="mt-2 ml-3">{{ block.theme.title }}</b-badge>
        <b-badge v-show='block.isSensitive' pill variant="info" class="mt-2 ml-3">Gevoelige inhoud</b-badge>
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
    }
  },
  components: {
    TimeBadge
  }
})
</script>
