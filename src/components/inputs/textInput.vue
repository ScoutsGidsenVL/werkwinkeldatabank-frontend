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
        <b-form-input
          :id='id'
          :type='type'
          :disabled='disabled'
          v-model='input'
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
  name: 'text-input',
  props: {
    value: String,
    label: String,
    type: String as PropType<inputTypes>,
    id: String,
    disabled: Boolean,
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
