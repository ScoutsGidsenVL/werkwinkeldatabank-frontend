
<template>
<div>
    <b-button
    v-show='can("workshops.change_workshop")'
    v-on:click.prevent='showModalAndCallHistory'
    size='sm'
    variant="primary">
        <b-icon icon="clock-history" aria-label="edit" class="mx-2"></b-icon>
        <span class="d-inline-block mb-1">geschiedenis</span>
    </b-button>
    <b-modal
      id="modal-history"
      size="xl"
      title="Geschiedenis"
      v-model="showModal" hide-footer
      header-bg-variant='light'
      header-text-variant="primary"
      footer-bg-variant='light'
      footer-text-variant="primary"
    >
        <b-row
        v-for="result in historyResult"
        :key='result.id'
        class="py-3 border border-top-0 border-left-0 border-right-0"
        >
            <b-col cols="5" class="pt-2">
                {{ result.result.title }}
            </b-col>
             <b-col cols="4" class="pt-2">
                {{ result.date }}
            </b-col>
            <b-col cols="3">
                <b-button
                    size="sm"
                    class="text-dark"
                    v-on:click.prevent='setOldVersion(result.result)'
                    variant="primary">
                        <b-icon icon="clock-history" aria-label="edit" class="mx-2 mt-2" style="color: white; font-weight: 900;"></b-icon>
                        <span class="d-inline-block mb-1" style="color: white; font-weight: 900;">zet terug</span>
                </b-button>
            </b-col>
        </b-row>
    </b-modal>
</div>
</template>

<script lang='ts'>
import usePermissions from '@/composables/usePermissions'
import useRepository, { callTypes } from '@/composables/useRepository'
import { useRouter } from '@/composables/useRouter'
import BaseEntityModel from '@/models/entities/baseEntityModel'
import BaseRepository from '@/repositories/baseRepository'
import { defineComponent, PropType, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'history-modal',
  props: {
    paramIdentifier: {
      type: String,
      required: true
    },
    repo: {
      type: Function as PropType<new (...params: any[]) => BaseRepository>,
      required: true
    }
  },
  setup ({ paramIdentifier, repo }, { emit }) {
    const { can } = usePermissions()
    const { route, router } = useRouter()
    const showModal = ref<boolean>(false)
    const { loading: loadingHistory, doCall: doCallHistory, historyResults: historyResult } = useRepository(
      repo,
      callTypes.history,
      { id: route.value.params[paramIdentifier]
      })

    const setOldVersion = (result: BaseEntityModel) => {
      emit('setOldVersion', result)
      showModal.value = false
    }

    const showModalAndCallHistory = () => {
      showModal.value = true
      doCallHistory()
    }

    return {
      setOldVersion,
      showModalAndCallHistory,
      showModal,
      can,
      historyResult
    }
  }
})
</script>

<style scoped lang='scss'>
::v-deep .modal-body{
  padding-bottom: 0;
  padding-top: 0;
}
</style>
