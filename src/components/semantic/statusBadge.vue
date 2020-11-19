<template>
    <b-badge pill variant="secondary" class="px-3 mx-2">
        {{ statusLabel }}
    </b-badge>
</template>

<script lang='ts'>
import { computed, defineComponent } from '@vue/composition-api'


export default defineComponent({
  name: 'status-badge',
  props: {
    status: String
  },
  setup ({ status }) {
    const statusLabel = computed<String>(() => {
      let label : String
      switch (status) {
      case 'PUBLICATION_REQUESTED':
        label = 'Publicatie aangevraagd'
        break
      case 'PRIVATE':
        label = 'Privé'
        break
      default:
        label = 'gepubliceerd'
        break
      }

      return label
    })

    return {
      statusLabel
    }
  }
})
</script>
