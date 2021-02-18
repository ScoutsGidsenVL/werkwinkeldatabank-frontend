<template>
<div class="base-container">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'base-page'
})
</script>

<style lang="scss">
  .base-container {
    max-width: none;
  }
</style>

