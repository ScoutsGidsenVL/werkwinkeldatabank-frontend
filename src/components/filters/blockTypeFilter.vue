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
import BuildingBlocksEntityModel from '@/models/entities/buildingBlocksEntityModel'
import { defineComponent, watch, ref } from '@vue/composition-api'
import SelectInput from '../inputs/selectInput'

export default defineComponent({
  name: 'block-type-filter',
  props: {
    value: String
  },
  components: {
    SelectInput
  },
  setup (props, { emit }) {
    const types : String[] = BuildingBlocksEntityModel.getTypesArray()
    let input = ref(props.value)

    watch(input, value => {
      emit('input', value ? BuildingBlocksEntityModel.convertType(value) : undefined)
    })

    return {
      types,
      input
    }
  }
})
</script>
