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
import SelectInput from '../inputs/selectInput'

export default defineComponent({
  name: 'duratioon-filter',
  props: {
    value: Object
  },
  components: {
    SelectInput
  },
  setup (props, { emit }) {
    const options : String[] = ['minder dan een uur', '1 tot 4 uur', 'meer dan 4 uur']
    let input = ref()


    const optionObject = {
      'minder dan een uur':
        {
          'id': 'minder dan een uur',
          'duration_start': '00:00:00',
          'duration_end': '01:00:00'
        },
      '1 tot 4 uur':
        {
          'id': '1 tot 4 uur',
          'duration_start': '01:00:00',
          'duration_end': '04:00:00'
        },
      'meer dan 4 uur':
        {
          'id': 'meer dan 4 uur',
          'duration_start': '04:00:00',
          'duration_end': '99:00:00'
        }
    }


    Object.keys(optionObject).forEach((key) => {
      if (props.value && optionObject[key].id === props.value.id) {
        input.value = key
      }
    })

    watch(input, value => {
      let emitValue : undefined | {[key: string]: string}
      emitValue = value ? optionObject[value] : undefined

      emit('input', emitValue)
    })

    return {
      options,
      input
    }
  }
})
</script>
