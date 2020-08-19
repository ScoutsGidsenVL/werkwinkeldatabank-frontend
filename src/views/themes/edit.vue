<template>
  <div class="col-12"  v-if="!loading">
      <theme-form
        v-model='result'
        v-on:submit='onSubmit'
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import ThemeForm from '../../components/forms/theme.vue'
import RepositoryFactory from '../../repositories/repositoryFactory'
import WorkshopRepository from '../../repositories/workshopRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseEntityModel from '../../models/entities/baseEntityModel'
import useRepository, { callTypes } from '../../composables/useRepository'
import { useRouter } from '../../composables/useRouter'
import useGlobalLoading from '../../composables/useGlobalLoading'
import ThemeRepository from '@/repositories/themeRepository'

export default defineComponent({
  name: 'theme-edit',
  components: {
    ThemeForm
  },
  setup () {
    const { route, router } = useRouter()
    console.log(route.value.params)
    const { loading, doCall, result } = useRepository(
      ThemeRepository,
      callTypes.getSingel,
      { id: route.value.params.themeId
      })
    useGlobalLoading(loading)
    doCall()

    const onSubmit = async () : Promise<void> => {
      const postRepo = useRepository(
        ThemeRepository,
        callTypes.update,
        { id: result.value.id,
          model: result.value
        }
      )
      useGlobalLoading(postRepo.loading)
      await postRepo.doCall()
      router.push({ name: 'ThemeOverview' })
    }

    return {
      result,
      onSubmit,
      loading
    }
  }
})
</script>
