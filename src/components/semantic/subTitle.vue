<template>
    <b-col cols="12" class="text-left py-3">
        <h4 class="border border-left-0 border-top-0 border-right-0 pb-2">{{ label }}</h4>
    </b-col>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'sub-title',
  props: {
    label: String
  }
})
</script>
