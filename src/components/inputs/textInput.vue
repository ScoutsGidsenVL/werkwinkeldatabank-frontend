/* eslint-disable no-unused-vars */
<template>
    <div>

      <validation-provider
        v-if="type !== 'time'"
        :rules="rules"
        v-slot="validationContext"
        :name="label"
      >
        <b-form-group
          :id='id'
          :label="label + (isRequired === true ? ' *' : '')"
          class="text-left"
          label-for="title"
        >
          <b-form-input
            v-if="!textarea"
            :id='id'
            :type='type'
            :disabled='disabled'
            v-model='input'
            :state=' Object.keys(rules).length === 0 ? null : getValidationState(validationContext)'
            v-on:keyup.enter="$event.target.blur()"
          />
          <b-form-textarea
            v-else
            :id='id'
            :type='type'
            :disabled='disabled'
            v-model='input'
            :state=' Object.keys(rules).length === 0 ? null : getValidationState(validationContext)'
          />
          <b-form-invalid-feedback v-for="error in validationContext.errors" :key="error">{{ error }}</b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <div v-if="type === 'time'">
        <div class="text-left">
          <span>{{ label }}</span>
        </div>
        <div class="d-flex mb-2 mt-2">
           <b-form-input
            min="00"
            max="24"
            v-if="!textarea"
            :id='hours'
            type='number'
            :disabled='disabled'
            v-model='hours'
            style="max-width: 4em"
          />
          <strong class="ml-1 mr-1 mt-2">:</strong>
          <b-form-input
              min="00"
              max="59"
              v-if="!textarea"
              :id='minutes'
              type='number'
              :disabled='disabled'
              v-model='minutes'
              style="max-width: 4em"
          />
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
import getValidationState from '../../composables/useValidationState'

export enum inputTypes {
    text = 'text',
    email = 'email',
    time = 'time'
}

export default defineComponent({
  name: 'text-input',
  props: {
    value: String,
    label: String,
    isRequired: Boolean,
    type: String as PropType<inputTypes>,
    id: String,
    disabled: Boolean,
    textarea: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => { return { required: true, min: 3 } }
    }
  },
  setup (props, { emit }) {
    const hours = ref<string>('00')
    const minutes = ref<string>('00')
    let input = ref(props.value)
    if (props.value) {
      var res = props.value.split(':')
      hours.value = res[0]
      minutes.value = res[1]
    }
    let displayHour = hours.value
    let displayMinutes = minutes.value

    watch(input, value => {
      emit('input', value)
    })

    watch(() => props.value, () => { input.value = props.value })

    watch(() => hours.value, () => {
      displayHour = hours.value
      if (hours.value.length === 0) {
        displayHour = '00'
      }
      if (hours.value.length === 1) {
        displayHour = ('0' + hours.value)
      }
      if (hours.value.length > 2) {
        displayHour = '23'
      }
      input.value = displayHour + ':' + displayMinutes
    })

    watch(() => minutes.value, () => {
      displayMinutes = minutes.value
      if (minutes.value.length === 0) {
        displayMinutes = '00'
      }
      if (minutes.value.length === 1) {
        displayMinutes = ('0' + minutes.value)
      }
      if (minutes.value.length > 2) {
        displayMinutes = '59'
      }
      input.value = displayHour + ':' + displayMinutes
    })

    return {
      getValidationState,
      input,
      hours,
      minutes,
    }
  }
})
</script>
