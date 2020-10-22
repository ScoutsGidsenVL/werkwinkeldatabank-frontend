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
        deselectLabel='Druk op enter om te verwijderen'
        selectLabel='Durk enter om te selecteren'
        selectedLabel='Geselecteerd'
     >
      <template slot="noOptions">Geen resultaat</template>
      <template slot="noResult">Geen resultaat</template>
     </multi-select>
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
  setup (props, { emit }) {
    //  @ts-ignore
    const input = ref<BaseEntityModel | BaseEntityModel[] | undefined>(props.value)
    let loadingLocal : boolean | Ref<Boolean> = false
    let optionsValue = ref<Array<any>>([])

    if (props.repo) {
      // @ts-ignore userepo can't get a undifined value, but is checked on line 57
      const { loading, results, doCall } = useRepository(props.repo)
      optionsValue = results
      loadingLocal = loading
      doCall()
    }

    if (props.options) {
      //  @ts-ignore
      optionsValue = props.options
    }

    watch(input, value => {
      emit('input', value)
    })

    watch(() => props.value, () => {
      //  @ts-ignore
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
</style>
