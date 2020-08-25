<template>
  <validation-provider
    :rules="rules"
    v-slot="validationContext"
  >
    <label class='text-left w-100' :for='id'>{{label}}</label>
     <multi-select
        v-if='!loading'
        class="mb-4"
        :class='getValidationState(validationContext) === false ? "not-valid"  : "valid" '
        v-model='input'
        track-by="title"
        label="title"
        placeholder="Selecteer"
        :options="results"
        :searchable="false"
        :allow-empty="true"
        :multiple='multiple'
     />
  </validation-provider>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from '@vue/composition-api'
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
    value: [Object, Array],
    repo: {
      type: Function as PropType<new (...params: any[]) => BaseRepository>,
      required: true
    },
    rules: {
      type: Object,
      default: () => { return { required: true } }
    }
  },
  components: {
    'multi-select': Multiselect
  },
  setup (props, { emit }) {
    const input = ref<BaseEntityModel | BaseEntityModel[] | undefined>(props.value)
    const { loading, results, doCall } = useRepository(props.repo)
    let options = ref<BaseEntityModel[]>([])

    doCall()

    watch(input, value => {
      emit('input', value)
    })

    watch(() => props.value, () => { input.value = props.value })


    return {
      input,
      loading,
      results,
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
</style>
