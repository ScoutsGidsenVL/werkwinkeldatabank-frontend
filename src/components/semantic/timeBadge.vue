<template>
    <b-badge pill variant="secondary">
        <b-icon icon="clock" aria-label="Help" style="width: fit-content" class="ml-1 mr-2"></b-icon>
        {{ formatedTime }}
    </b-badge>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'


export default defineComponent({
  name: 'time-badge',
  props: {
    time: {
      type: String,
      required: true
    }
  },
  setup ({ time }) {
    const formatedTime : String = time.length === 5 ? time : time.slice(0, 5)

    return {
      formatedTime
    }
  }
})
</script>
