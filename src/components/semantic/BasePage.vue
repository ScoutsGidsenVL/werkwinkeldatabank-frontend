<template>
<div class="container">
    <div class="row">
        <slot/>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BasePage'
})
</script>
