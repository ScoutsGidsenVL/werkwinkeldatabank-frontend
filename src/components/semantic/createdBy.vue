<template>
    <span class="w-100 h6 text-left d-inline-block" v-if="createdBy && can('workshops.view_field_created_by_workshop')">
        Gemaakt door:
        {{ createdBy.firstName }}
        {{ createdBy.lastName }}
        <span v-if="createdBy.email">
        (
        <a  :href="'mailto:'+createdBy.email">
            {{ createdBy.email }}
        </a>
        )
        </span>
    </span>
</template>

<script lang='ts'>
import usePermissions from '@/composables/usePermissions'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'created-by',
  props: {
    createdBy: {
      type: Object,
      required: false
    }
  },
  setup () {
    const { can } = usePermissions()

    return {
      can
    }
  }
})
</script>
