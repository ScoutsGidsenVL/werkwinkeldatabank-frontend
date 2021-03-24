<template>
  <validation-provider
    :rules="rules"
    v-slot="validationContext"
    :name="label"
  >
  <b-form-group
        :id='id'
        :label='label'
        class="text-left"
        label-for="title"
      >
     <multi-select
        v-if='!loadingLocal'
        class="mb-4"
        :class='getValidationState(validationContext) === false ? "not-valid"  : "valid" '
        v-model='input'
        :track-by='repo ? "title" : ""'
        :label='repo ? "title" : ""'
        placeholder="Selecteer"
        :options="optionsValue"
        :searchable="searchable"
        :allow-empty="true"
        :multiple='multiple'
        deselectLabel=''
        selectLabel=''
        selectedLabel='Geselecteerd'
        :disabled="disabled"
     >
      <template slot="noOptions">Geen resultaat</template>
      <template slot="noResult">Geen resultaat</template>
     </multi-select>
    <b-form-invalid-feedback v-for="error in validationContext.errors" :key="error">{{ error }}</b-form-invalid-feedback>
  </b-form-group>
  </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch, PropType } from '@vue/composition-api'
import Multiselect from 'vue-multiselect'
import BaseEntityModel from '../../models/entities/baseEntityModel'
import BaseRepository from '../../repositories/baseRepository'
import RepositoryFactory from '../../repositories/repositoryFactory'
import getValidationState from '../../composables/useValidationState'
import useRepository from '../../composables/useRepository'

export default defineComponent({
  name: 'select-input',
  props: {
    label: String,
    id: String,
    multiple: Boolean,
    searchable: {
      type: Boolean,
      default: false
    },
    repo: {
      type: Function as PropType<new (...params: any[]) => BaseRepository>,
      default: undefined
    },
    options: {
      type: [
        Object as () => Array<any>,
        Array]
    },
    rules: {
      type: Object,
      default: () => { return { required: true } }
    },
    value: {
      type: [
        Object as () => BaseEntityModel | BaseEntityModel[] | undefined,
        Array as () => BaseEntityModel | BaseEntityModel[] | undefined,
        String
      ]
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    'multi-select': Multiselect
  },
  setup (props, { emit }) {
    const input = ref<BaseEntityModel | BaseEntityModel[] | string |undefined>(props.value)
    let loadingLocal : boolean | Ref<Boolean> = false
    let optionsValue = ref<Array<any>>([])

    if (props.repo) {
      const { loading, results, doCall } = useRepository(props.repo)
      optionsValue = results
      loadingLocal = loading
      doCall()
    }

    if (props.options) {
      optionsValue.value = props.options
    }

    watch(input, value => {
      emit('input', value)
    })

    watch(() => props.value, () => {
      input.value = props.value
    })


    return {
      input,
      loadingLocal,
      optionsValue,
      getValidationState
    }
  }
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang='scss'>
  .not-valid .multiselect__tags{
    border-color: red;
  }

  .not-valid.multiselect ~ .invalid-feedback{
    display: block;
    margin-top: -1rem;
  }

  .multiselect__option.multiselect__option--highlight,
  .multiselect__option.multiselect__option--highlight:after{
    background-color: #748d26;
  }

  .multiselect__tag{
    background-color: #748d26;
  }
</style>
