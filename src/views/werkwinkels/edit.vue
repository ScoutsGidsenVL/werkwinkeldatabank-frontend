<template>
  <div class="col-12"  v-if="!loading">
      <workshop-form
        v-model='result'
        v-on:submit='onSubmit'
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import WorkshopForm from '../../components/forms/workshop.vue'
import RepositoryFactory from '../../repositories/repositoryFactory'
import WorkshopRepository from '../../repositories/workshopRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseEntityModel from '../../models/entities/baseEntityModel'
import useRepository, { callTypes } from '../../composables/useRepository'
import { useRouter } from '../../composables/useRouter'
import useGlobalLoading from '../../composables/useGlobalLoading'

export default defineComponent({
  name: 'workshops-edit',
  components: {
    WorkshopForm
  },
  setup () {
    const { route } = useRouter()
    const { loading, doCall, result } = useRepository(
      WorkshopRepository,
      callTypes.getSingel,
      { id: route.value.params.workshopId
      })
    useGlobalLoading(loading)
    doCall()

    const onSubmit = () : Promise<BaseEntityModel> => RepositoryFactory.get(WorkshopRepository).update(result.value)

    return {
      result,
      onSubmit,
      loading
    }
  }
})
</script>
