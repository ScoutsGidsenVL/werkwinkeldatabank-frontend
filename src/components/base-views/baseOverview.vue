<template>
<b-col cols="12">
  <b-row>
    <b-col cols="12"  class="text-right">
      <router-link :to="{name: createRoute}" >
        + nieuwe {{label}} aanmaken
      </router-link>
    </b-col>
    <b-col cols="12"  class="text-left">
      <b-row>
        <slot name='filters' v-bind:filters='callParams.filters'/>
         <b-col
           v-if="filtersProp"
           cols="12"
           lg='4'
           class="justify-content-end align-items-center d-flex">
            <a href='' v-on:click.prevent="resetFilers" class="d-inline-block">reset</a>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="text-left mt-3">
        <slot
         v-if="results.length > 0"
         name='content'
         v-bind:results="results"
        />
        <span
         v-else
         class="d-inline-block w-100 text-center my-4"
        >
          <strong>Geen resultaat</strong>
        </span>
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
import { defineComponent, reactive, watch, PropType, ref } from '@vue/composition-api'
import useRepository, { callTypes } from '../../composables/useRepository'
import ThemeRepository from '../../repositories/themeRepository'
import BaseRepository, { repoParams } from '../../repositories/baseRepository'
import { useRouter } from '@/composables/useRouter'
import { filter } from 'vue/types/umd'

export default defineComponent({
  name: 'base-overview',
  components: {
  },
  props: {
    filtersProp: {
      type: Object,
      required: false
    },
    repo: {
      type: Function as PropType<new (...params: any[]) => BaseRepository>,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    createRoute: {
      type: String,
      required: true
    }
  },
  setup ({ repo, filtersProp }) {
    const { router, route } = useRouter()
    let filters : any = {}

    // set prop values on clean filter value to remove observer
    if (filtersProp) {
      Object.keys(filtersProp).forEach((key: any) => { filters[key] = filtersProp[key] })
    }

    if (route.value.query.filters) {
      filters = JSON.parse(route.value.query.filters.toString())
    }

    let callParams = reactive<repoParams>({
      filters: filters
    })
    const { loading, doCall, results, loadMore } = useRepository(repo, callTypes.getModelArray, callParams)
    doCall()

    watch(callParams, value => {
      router.replace({ query: { filters: JSON.stringify(callParams.filters) } })
      callParams.page = 1
      doCall()
    })

    const resetFilers = () => { callParams.filters = filters }

    return {
      results,
      ThemeRepository,
      resetFilers,
      callParams,
      loadMore
    }
  }
})
</script>
