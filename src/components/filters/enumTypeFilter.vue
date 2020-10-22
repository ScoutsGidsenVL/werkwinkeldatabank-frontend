<template>
    <b-col cols="12" lg='4'>
        <select-input
          label='Type'
          :rules='{}'
          id="type"
          v-model="input"
          :options='types'
          :multiple='false'
        />
      </b-col>
</template>

<script lang='ts'>
import { useEnum } from '@/composables/useEnum'
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import { defineComponent, watch, ref } from '@vue/composition-api'
import SelectInput from '../inputs/selectInput.vue'

export default defineComponent({
  name: 'enum-filter',
  props: {
    value: String,
    enumToUse: Object
  },
  components: {
    SelectInput
  },
  setup (props, { emit }) {
    const { getTypesArray, convertType } = useEnum(props.enumToUse)
    const types : String[] = getTypesArray()
    let input = ref(props.value)

    watch(input, value => {
      emit('input', value ? convertType(value) : undefined)
    })

    watch(() => props.value, () => {
      if (!props.value) {
        input.value = undefined
      }
    })

    return {
      types,
      input
    }
  }
})
</script>
