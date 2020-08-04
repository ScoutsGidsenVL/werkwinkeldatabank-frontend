/* eslint-disable no-unused-vars */
<template>
     <validation-provider
        :rules="{ required: true, min: 3 }"
        v-slot="validationContext"
    >
      <b-form-group
        :id='id'
        :label='label'
        label-for="title"
      >
        <b-form-input
          :id='id'
          :type='type'
          v-model='input'
          :state='getValidationState(validationContext)'
        />
      </b-form-group>
    </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import getValidationState from '../../composables/useValidationState'

export enum inputTypes {
    text = 'text',
    email = 'email'
}

export default defineComponent({
  props: {
    value: String,
    label: String,
    type: String as PropType<inputTypes>,
    id: String
  },
  setup ({ value }, { emit }) {

    let input = ref(value)

    watch(input, value => {
      emit('input', value)
    })

    return {
      getValidationState,
      input
    }
  }
})
</script>
