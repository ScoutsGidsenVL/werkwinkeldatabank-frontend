<template>
    <b-badge v-if='can("workshops.view_field_is_sensitive_workshop")' pill variant="info" class="ml-3">Gevoelig om snel gedateerd te zijn</b-badge>
</template>

<script lang='ts'>
import usePermissions from '@/composables/usePermissions'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'sensitive-badge',
  setup () {
    const { can } = usePermissions()

    return {
      can
    }
  }
})
</script>
