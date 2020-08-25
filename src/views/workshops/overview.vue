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
        <b-col cols="12" lg="4">
          <text-input
            v-model="callParams.filters.term.value"
            label="Zoek"
            :rules='{}'
            id='title'
            :type="inputTypes.text"
          />
        </b-col>
        <b-col cols="12" lg='4'>
          <select-input
            label='Thema'
            id="theme"
            :rules='{}'
            :multiple='true'
            :repo='ThemeRepository'
            v-model="callParams.filters.theme.value"
          />
        </b-col>
        <b-col cols="12" lg='4' class="justify-content-end align-items-center d-flex">
          <a href='' v-on:click.prevent="resetFilers" class="d-inline-block">reset</a>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="text-left mt-3">
      <b-row>
        <workshop-item
          v-for="workshop in results"
          :key='workshop.id'
          :workshop='workshop'
        />
      </b-row>
      <b-row>
        <b-col class="text-center my-3">
          <b-button v-on:click='loadMore' :disabled='callParams.isMaxPage' >Load more</b-button>
        </b-col>
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
import SelectInput from '../../components/inputs/selectInput.vue'
import TextInput, { inputTypes } from '../../components/inputs/textInput.vue'
import { repoParams } from '../../repositories/baseRepository'
import { useRouter } from '@/composables/useRouter'
import { filter } from 'vue/types/umd'

export default defineComponent({
  name: 'workshop-overview',
  components: {
    WorkshopItem,
    SelectInput,
    TextInput
  },
  setup () {
    const { router, route } = useRouter()
    let filters : any = { theme: { type: 'arrayEntity', value: undefined }, term: { type: 'string', value: undefined } }

    if (route.value.query.filters) {
      filters = JSON.parse(route.value.query.filters.toString())
    }

    let callParams = reactive<repoParams>({
      filters: filters
    })
    const { loading, doCall, results, loadMore } = useRepository(WorkshopRepository, callTypes.getModelArray, callParams)

    doCall()

    watch(callParams, value => {
      router.replace({ query: { filters: JSON.stringify(callParams.filters) } })
      callParams.page = 1
      doCall()
    })

    const resetFilers = () => { callParams.filters = { theme: { type: 'arrayEntity', value: undefined }, term: { type: 'string', value: undefined } } }

    return {
      results,
      inputTypes,
      ThemeRepository,
      resetFilers,
      callParams,
      loadMore
    }
  }
})
</script>
