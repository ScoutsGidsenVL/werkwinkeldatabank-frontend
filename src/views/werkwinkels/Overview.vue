<template>
<b-col cols="12">
  <b-row>
    <b-col cols="12"  class="text-right">
      <router-link :to="{name: 'WerkwinkelCreate'}" >
        + nieuwe werkwinkel aanmaken
      </router-link>
    </b-col>
    <b-col cols="12"  class="text-left">
      <b-row>
        <b-col cols="12" lg='4'>
          <select-input
            label='Thema'
            id="theme"
            :multiple='true'
            :repo='ThemeRepository'
            v-model="callParams.filters.theme.value"
          />
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="text-left mt-3">
      <b-row>
        <workshop-item
          v-for="workshop in result"
          :key='workshop.id'
          :workshop='workshop'
        />
      </b-row>
    </b-col>
  </b-row>
</b-col>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import useRepository, { callTypes } from '../../composables/useRepository'
import WorkshopRepository from '../../repositories/workshopRepository'
import WorkshopItem from '../../components/list/workshopItem.vue'
import ThemeRepository from '../../repositories/themeRepository'
import SelectInput from '../../components/inputs/selectInput'
import { repoParams } from '../../repositories/baseRepository'
import { useRouter } from '@/composables/useRouter'
import { filter } from 'vue/types/umd'

export default defineComponent({
  name: 'werkwinkels-overview',
  components: {
    WorkshopItem,
    SelectInput
  },
  setup () {
    const { router, route } = useRouter()
    let filters : any = { theme: { type: 'array', value: null } }
    if (route.value.query.filters) {
      filters = JSON.parse(route.value.query.filters)
    }

    let callParams = reactive<repoParams>({
      filters: filters
    })
    const { loading, doCall, result } = useRepository(WorkshopRepository, callTypes.getModelArray, callParams)

    doCall()

    watch(callParams, value => {
      router.replace({ query: { filters: JSON.stringify(callParams.filters) } })
      doCall()
    })

    return {
      result,
      ThemeRepository,
      callParams
    }
  }
})
</script>
