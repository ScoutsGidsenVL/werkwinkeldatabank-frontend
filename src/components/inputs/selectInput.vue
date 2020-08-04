<template>
  <validation-provider
    :rules="{ required: true}"
    v-slot="validationContext"
  >
    <label class=' test-wtf text-left w-100' :for='id'>{{label}} {{ loading  }}</label>
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
        :allow-empty="false"
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
    value: Object as PropType<BaseEntityModel>,
    repo: Function as PropType<BaseRepository>
  },
  components: {
    'multi-select': Multiselect
  },
  setup ({ value, repo }, { emit }) {
    const input = ref<BaseEntityModel | undefined>(value)
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
