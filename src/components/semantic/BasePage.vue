<template>
<div class="container bg-white pt-4 pb-5 px-5">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'base-page'
})
</script>

