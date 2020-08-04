<template>
  <div class="col-12">
      <workshop-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import WorkshopForm from '../../components/forms/workshop.vue'

export default defineComponent({
  name: 'workshops-create',
  components: {
    'workshop-form': WorkshopForm
  }
})
</script>
