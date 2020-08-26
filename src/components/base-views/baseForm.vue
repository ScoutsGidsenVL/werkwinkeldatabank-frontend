<template>
<validation-observer ref="observer" v-slot="{ handleSubmit }">
  <b-form  @submit.stop.prevent="handleSubmit(onSubmit)"  v-if="!loading">
      <slot v-bind:formData='form' />
  </b-form>
</validation-observer>
</template>

<script lang="ts">
import { reactive, ref, Ref, defineComponent, PropType } from '@vue/composition-api'
import ThemeRepository from '../../repositories/themeRepository'
import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import BaseRepository, { repoParams } from '@/repositories/baseRepository'
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
    },
    redirectRoute: {
      type: String,
      required: true
    }
  },
  setup ({ repo, defaultValue, paramIdentifier, redirectRoute }, { emit }) {
    const { route, router } = useRouter()
    const { loading, doCall, result } = useRepository(
      repo,
      callTypes.getSingel,
      { id: route.value.params[paramIdentifier]
      })
    useGlobalLoading(loading)
    const isEdit = !!route.value.params[paramIdentifier]
    isEdit && doCall()
    let form : Ref<BaseEntityModel | undefined> | BaseEntityModel = isEdit ? result : defaultValue


    const onSubmit = async () : Promise<void> => {
      let repoParams : repoParams = {}

      if (isEdit && result.value) {
        repoParams = {
          id: result.value.id,
          model: result.value
        }
      } else {
        repoParams = {
          model: defaultValue
        }
      }

      console.log(repoParams.model)

      const postRepo = useRepository(
        repo,
        isEdit ? callTypes.update : callTypes.create,
        repoParams
      )
      useGlobalLoading(postRepo.loading)
      await postRepo.doCall()
      router.push({ name: redirectRoute })
    }

    return {
      onSubmit,
      form,
      loading
    }
  }
})
</script>
