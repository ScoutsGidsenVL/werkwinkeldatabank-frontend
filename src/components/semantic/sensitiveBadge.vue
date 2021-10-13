<template>
    <b-badge v-if='can("workshops.view_field_is_sensitive_workshop")' pill variant="info" class="custom-font-size">Gevoelig om snel gedateerd te zijn</b-badge>
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

<style lang="scss" scoped>
  .custom-font-size {
    @media (max-width: 575px) {
      font-size:10px !important;
    }
  }
</style>
