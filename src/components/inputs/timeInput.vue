/* eslint-disable no-unused-vars */
<template>
     <validation-provider
        :rules="rules"
        v-slot="validationContext"
    >
      <b-form-group
        :id='id'
        :label='label'
        class="text-left"
        label-for="title"
      >
        <b-time
         :id='id'
         v-model='input'
         locale="en"
         :hour12='false'
         hourCycle="h24"
         :state=' Object.keys(rules).length === 0 ? null : getValidationState(validationContext)'
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
  name: 'time-input',
  props: {
    value: String,
    label: String,
    id: String,
    rules: {
      type: Object,
      default: () => { return { required: true, min: 3 } }
    }
  },
  setup (props, { emit }) {

    let input = ref(props.value)

    watch(input, value => {
      emit('input', value)
    })

    watch(() => props.value, () => { input.value = props.value })

    return {
      getValidationState,
      input
    }
  }
})
</script>
