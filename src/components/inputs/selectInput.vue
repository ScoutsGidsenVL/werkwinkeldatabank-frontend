<template>
  <validation-provider
    :rules="{ required: true}"
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
        :options="result"
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
    }
  },
  components: {
    'multi-select': Multiselect
  },
  setup ({ value, repo }, { emit }) {
    const input = ref<BaseEntityModel | BaseEntityModel[] | undefined>(value)
    const { loading, result, doCall } = useRepository(repo)
    let options = ref<BaseEntityModel[]>([])

    doCall()

    watch(input, value => {
      emit('input', value)
    })

    return {
      input,
      loading,
      result,
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
