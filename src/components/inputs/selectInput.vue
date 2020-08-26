<template>
  <validation-provider
    :rules="rules"
    v-slot="validationContext"
  >
    <label class='text-left w-100' :for='id'>{{label}}</label>
     <multi-select
        v-if='!loadingLocal'
        class="mb-4"
        :class='getValidationState(validationContext) === false ? "not-valid"  : "valid" '
        v-model='input'
        :track-by='repo ? "title" : ""'
        :label='repo ? "title" : ""'
        placeholder="Selecteer"
        :options="optionsValue"
        :searchable="false"
        :allow-empty="true"
        :multiple='multiple'
     />
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
    value: [Object, Array, String],
    repo: {
      type: Function as PropType<new (...params: any[]) => BaseRepository>,
      required: false
    },
    options: [Object, Array],
    rules: {
      type: Object,
      default: () => { return { required: true } }
    }
  },
  components: {
    'multi-select': Multiselect
  },
  setup ({ value, repo, options }, { emit }) {
    const input = ref<BaseEntityModel | BaseEntityModel[] | undefined>(value)
    let loadingLocal : boolean | Ref<Boolean> = false
    let optionsValue = ref<Array<any>>([])

    if (repo) {
      // @ts-ignore userepo can't get a undifined value, but is checked on line 57
      const { loading, results, doCall } = useRepository(repo)
      optionsValue = results
      loadingLocal = loading
      doCall()
    }

    if (options) {
      optionsValue = options
    }

    watch(input, value => {
      emit('input', value)
    })

    watch(() => value, () => { input.value = value })


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
</style>
