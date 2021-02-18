<template>
<validation-observer ref="observer" v-slot="{ handleSubmit, validate }">


  <b-form class="bg-white shadow pt-4 pb-5 px-5" @submit.stop.prevent="customHandleSubmit(handleSubmit, validate)"  v-if="!loading">
     <div v-if="historyModal" cols="12" class="text-right bg-white pt-3 pl-5 pr-2 mb-3">
      <history-modal
        :repo='repo'
        :paramIdentifier='paramIdentifier'
        v-on:setOldVersion='setOldVersion'
      />
    </div>
      <slot v-bind:formData='form' />
  </b-form>
  <div
    v-if="!loading"
    class="action-bar container position-sticky bg-secondary pb-4 px-4"
  >
  <b-row>
        <b-col cols="12" lg="7" class="text-left mt-4 mb-4" >
          <b-button :disabled='saving'  v-on:click.prevent="saveWithoutRedirect(handleSubmit, validate)" variant="info" size="md" class="px-5 py-2 mr-2 mb-2">Opslaan</b-button>
          <b-button :disabled='saving' v-on:click.prevent="customHandleSubmit(handleSubmit, validate)" type="submit" variant="info" size="md" class="px-5 mb-2 py-2 mr-2">Opslaan en sluiten</b-button>
          <b-button :disabled='saving' v-on:click.prevent="redirect()" type="submit" variant="info" size="md" class="px-5 mb-2 py-2">Annuleren</b-button>
        </b-col>
        <b-col cols="12" lg='5' class="text-left  mt-lg-4">
          <slot
            name='actions'
            v-bind:customHandleSubmit='customHandleSubmit'
            v-bind:saveWithoutRedirect='saveWithoutRedirect'
            v-bind:onSubmit='onSubmit'
            v-bind:validate='validate'
            v-bind:formData='form'
            v-bind:saving='saving' />
        </b-col>
      </b-row>
  </div>
</validation-observer>
</template>

<script lang="ts">
import { Ref, ref, defineComponent, PropType } from '@vue/composition-api'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import BaseRepository, { repoParams } from '@/repositories/baseRepository'
import useRepository, { callTypes } from '@/composables/useRepository'
import { useRouter } from '@/composables/useRouter'
import useGlobalLoading from '@/composables/useGlobalLoading'
import useToast from '../../composables/useToast'
import usePermissions from '@/composables/usePermissions'
import historyModal from './historyModal.vue'

export default defineComponent({
  name: 'base-form',
  components: {
    historyModal
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
    },
    editRoute: {
      type: String,
      required: true
    },
    redirectWithId: {
      type: String
    },
    historyModal: {
      type: Boolean,
      default: false
    },
    cancelRoute: {
      type: String,
      required: true
    }
  },
  setup ({ repo, defaultValue, paramIdentifier, redirectRoute, redirectWithId, editRoute, cancelRoute }, { emit, root }) {
    const { route, router, redirectOnResult } = useRouter()
    const { can } = usePermissions()
    const { loading, doCall, result } = useRepository(
      repo,
      callTypes.getSingel,
      { id: route.value.params[paramIdentifier]
      })
    useGlobalLoading(loading)
    const isEdit = !!route.value.params[paramIdentifier] && !route.value.params['copy']
    const isCopy = !!route.value.params['copy']
    const redirectOnSave = ref<Boolean>(true)
    const toast = useToast(root)
    const saving = ref<Boolean>(false)


    if (isEdit || isCopy) {
      doCall().catch(() => {
        toast.send('U kan dit item niet bewerken', 'danger')
        router.push({ name: 'WerkwinkelOverview' })
      })
    }
    let form : Ref<BaseEntityModel | undefined> = (isEdit || isCopy) ? result : ref(defaultValue)

    const saveWithoutRedirect = (handleSubmit, validate) => {
      saving.value = true
      redirectOnSave.value = false
      customHandleSubmit(handleSubmit, validate)
    }

    const onSubmit = async (test) : Promise<void> => {
      let repoParams : repoParams = {}

      if (isEdit && result.value) {
        repoParams = {
          id: result.value.id,
          model: result.value
        }
      } else if (isCopy) {
        repoParams = {
          model: result.value
        }
      } else {
        repoParams = {
          model: defaultValue
        }
      }

      const postRepo = useRepository(
        repo,
        isEdit ? callTypes.update : callTypes.create,
        repoParams
      )
      useGlobalLoading(postRepo.loading)

      postRepo.doCall().then((success: Boolean) => {
        emit('submitSuccess', postRepo.result.value)
        if (success && redirectRoute && redirectOnSave.value) {
          redirectOnResult(redirectRoute, postRepo, paramIdentifier)
        } else {
          redirectOnSave.value = true
          toast.send('Opgeslagen')
          saving.value = false
          if (!isEdit) {
            redirectOnResult(editRoute, postRepo, paramIdentifier)
          }
        }
      }).catch((e) => {
        saving.value = false
        e && toast.send('Opslagen niet gelukt', 'danger')
      })
    }

    const customHandleSubmit = (handleSubmit, validate) => {
      validate().then((valid: boolean) => {
        if (valid) {
          handleSubmit(onSubmit)
        } else {
          saving.value = false
          toast.send('Niet alle velden zijn correct ingevuled', 'danger')
        }
      })
    }

    const redirect = () => {
      router.push({ name: cancelRoute })
    }

    const setOldVersion = (oldVersion: BaseEntityModel) => {
      form.value = oldVersion
    }

    return {
      saveWithoutRedirect,
      onSubmit,
      form,
      customHandleSubmit,
      loading,
      can,
      setOldVersion,
      saving,
      redirect
    }
  }
})
</script>

<style lang='scss' scoped>
  .action-bar{
    bottom: 0;
    z-index: 9;
  }
</style>
