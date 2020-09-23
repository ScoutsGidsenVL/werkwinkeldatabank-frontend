<template>
<b-col cols="12">
  <b-row>
    <b-col cols="12" v-show='showFilters' class="bg-white pt-4 px-4 pb-1 text-left">
      <b-row>
        <slot name='filters' v-bind:filters='callParams.filters'/>
      </b-row>
      <b-row>
        <b-col
           v-if="filtersProp"
           cols="12"
           class="justify-content-end align-items-center d-flex">
            <a href='' v-on:click.prevent="resetFilers" class="d-inline-block">reset</a>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="bg-white text-left mt-3">
        <b-col
          v-if="createRoute"
          cols="12"
          class="text-right my-3 mb-3">
          <router-link :to="{name: createRoute}" >
            + nieuwe {{label}} aanmaken
          </router-link>
        </b-col>
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
      <b-row v-show="!callParams.isMaxPage">
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
import BaseRepository, { repoParams } from '../../repositories/baseRepository'
import { useRouter } from '@/composables/useRouter'

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
      required: false
    },
    showFilters: {
      type: Boolean,
      default: true
    },
    filtersInUrlParams: {
      type: Boolean,
      default: true
    }
  },
  setup ({ repo, filtersProp, filtersInUrlParams }) {
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
      filtersInUrlParams && router.replace({ query: { filters: JSON.stringify(callParams.filters) } })
      callParams.page = 1
      doCall()
    })

    const resetFilers = () => {
      callParams.filters && Object.keys(callParams.filters).forEach(filterKey => {
        if (callParams.filters) {
          callParams.filters[filterKey].value = undefined
        }
      })
    }

    return {
      results,
      resetFilers,
      callParams,
      loadMore
    }
  }
})
</script>
