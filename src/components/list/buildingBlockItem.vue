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
    >
        <b-badge pill variant="secondary" class="mt-2">{{ block.type }}</b-badge>
        <b-badge pill variant="light" class="px-2 mx-2">
        <b-icon icon="clock" aria-label="Help" class="mx-2"></b-icon>{{ block.duration }}
        </b-badge>
    </b-col>
    <b-col
        cols='2'
        class="text-right">
        <slot />
    </b-col>
    </b-row>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@vue/composition-api'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'

export default defineComponent({
  props: {
    block: {
      type: Object as PropType<BuildingBlocksEntityModel>,
      required: true
    }
  }
})
</script>
