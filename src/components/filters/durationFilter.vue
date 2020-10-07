<template>
    <b-col cols="12" lg='4'>
        <select-input
          label='Duur'
          :rules='{}'
          id="type"
          v-model="input"
          :options='options'
          :multiple='false'
        />
      </b-col>
</template>

<script lang='ts'>
import { defineComponent, watch, ref } from '@vue/composition-api'
import SelectInput from '../inputs/selectInput.vue'

export default defineComponent({
  name: 'duratioon-filter',
  props: {
    value: Object,
    optionObject: {
      type: Object,
      default: () => {
        return {
          'tot 5 min':
        {
          'id': 'tot 5 min',
          'duration_start': '00:00:00',
          'duration_end': '00:05:00'
        },
          '5 tot 10 min':
        {
          'id': '5 tot 10 min',
          'duration_start': '00:05:00',
          'duration_end': '00:10:00'
        },
          '10 tot 20 min':
        {
          'id': '10 tot 20 min',
          'duration_start': '00:10:00',
          'duration_end': '00:20:00'
        },
          '20 tot 60 min':
        {
          'id': '20 tot 60 min',
          'duration_start': '00:20:00',
          'duration_end': '00:60:00'
        },
          'meer dan 60 min':
        {
          'id': 'meer dan 60 min',
          'duration_start': '00:60:00',
          'duration_end': '99:00:00'
        }
        }
      } }
  },
  components: {
    SelectInput
  },
  setup (props, { emit }) {
    let input = ref()

    const options: String[] = Object.keys(props.optionObject)


    Object.keys(props.optionObject).forEach((key) => {
      if (props.value && props.optionObject[key].id === props.value.id) {
        input.value = key
      }
    })

    watch(input, value => {
      let emitValue : undefined | {[key: string]: string}
      emitValue = value ? props.optionObject[value] : undefined

      emit('input', emitValue)
    })

    watch(() => props.value, () => {
      if (!props.value) {
        input.value = undefined
      }
    })



    return {
      options,
      input
    }
  }
})
</script>
