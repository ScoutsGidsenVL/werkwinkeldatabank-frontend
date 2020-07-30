<template>
  <div class="col-12 text-right">
    <router-link :to="{name: 'WerkwinkelCreate'}" >
      + nieuwe werkwinkel aanmaken
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'werkwinkels-overview',
  components: {
  }
})
</script>
