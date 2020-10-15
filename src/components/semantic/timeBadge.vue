<template>
    <b-badge pill variant="light" class="px-2 mx-2">
        <b-icon icon="clock" aria-label="Help" class="mx-2"></b-icon>
        {{ formatedTime }}
        <!-- {{ time && time.length === '5' ? time : time.splice(0, 5) }} -->
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
