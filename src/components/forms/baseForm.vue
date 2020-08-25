<template>
<validation-observer ref="observer" v-slot="{ handleSubmit }">
  <b-form  @submit.stop.prevent="handleSubmit(onSubmit)"  v-if="!loading">
      <slot v-bind:formData='form' />
  </b-form>
</validation-observer>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, PropType } from '@vue/composition-api'
import ThemeRepository from '../../repositories/themeRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import BaseRepository from '@/repositories/baseRepository'
import useRepository, { callTypes } from '@/composables/useRepository'
import { useRouter } from '@/composables/useRouter'
import useGlobalLoading from '@/composables/useGlobalLoading'
import ThemeEntityModel from '@/models/entities/themeEntityModel'

export default defineComponent({
  name: 'base-form',
  components: {
  },
  props: {
    defaultValue: {
      type: Object as PropType<BaseEntityModel>,
      required: true
    },
    repo: {
      type: Function as PropType<new (...params: any[]) => BaseRepository>,
      required: true
    },
    paramIdentifier: {
      type: String,
      required: true
    }
  },
  setup ({ repo, defaultValue, paramIdentifier }, { emit }) {
    const { route, router } = useRouter()
    const { loading, doCall, result } = useRepository(
      repo,
      callTypes.getSingel,
      { id: route.value.params[paramIdentifier]
      })
    useGlobalLoading(loading)
    const isEdit = !!route.value.params[paramIdentifier]
    isEdit && doCall()
    let form = isEdit ? result : defaultValue

    const onSubmit = async () : Promise<void> => {
      const postRepo = useRepository(
        repo,
        isEdit ? callTypes.update : callTypes.create,
        isEdit ? { id: result.value.id,
          model: form.value
        }
          : {
            model: form
          }
      )
      useGlobalLoading(postRepo.loading)
      await postRepo.doCall()
      router.push({ name: 'WerkwinkelOverview' })
    }

    return {
      onSubmit,
      form,
      loading
    }
  }
})
</script>
