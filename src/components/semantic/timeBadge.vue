<template>
    <b-badge pill variant="light" class="px-2 mx-2">
        <b-icon icon="clock" aria-label="Help" class="mx-2"></b-icon>
        <slot />
    </b-badge>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'


export default defineComponent({
  name: 'time-badge'
})
</script>
