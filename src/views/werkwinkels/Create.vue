<template>
  <div class="col-12">
      <werkwinkel-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import WerkwinkelForm from '../../components/forms/Werkwinkel.vue'

export default defineComponent({
  name: 'werkwinkels-create',
  components: {
    'werkwinkel-form': WerkwinkelForm
  }
})
</script>
