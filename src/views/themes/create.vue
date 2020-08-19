<template>
  <div class="col-12">
      <theme-form
        v-model='form'
        v-on:submit='onSubmit'
      />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import ThemeForm from '../../components/forms/theme.vue'
import useRepository, { callTypes, useRepositoryType } from '../../composables/useRepository'
import useGlobalLoading from '../../composables/useGlobalLoading'
import { useRouter } from '../../composables/useRouter'
import ThemeEntityModel from '@/models/entities/themeEntityModel'
import ThemeRepository from '@/repositories/themeRepository'

export default defineComponent({
  name: 'theme-create',
  components: {
    ThemeForm
  },
  setup () {
    const { router } = useRouter()
    const form = reactive<ThemeEntityModel>(ThemeEntityModel.deserialize({
      title: null,
      id: null
    }))

    const { loading, doCall } = useRepository(
      ThemeRepository,
      callTypes.create,
      { model: form }
    )
    useGlobalLoading(loading)

    const onSubmit = async () : Promise<void> => {
      await doCall()
      router.push({ name: 'ThemeOverview' })
    }

    return {
      form,
      onSubmit
    }
  }
})
</script>
