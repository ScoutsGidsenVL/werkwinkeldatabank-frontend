<template>
<b-col cols="12">
  <b-row>
    <b-col cols="12"  class="text-right">
      <router-link :to="{name: 'ThemeCreate'}" >
        + nieuwe thema aanmaken
      </router-link>
    </b-col>
    <b-col cols="12" class="text-left mt-3">
      <b-row
        v-for="theme in result"
        class="border border-left-0 border-top-0 border-right-0 py-3"
        :key='theme.id'>
        <b-col
          cols='10'
        >
            {{ theme.title }}
        </b-col>
        <b-col
          cols='2'
          class="text-right">
             <router-link :to="{name: 'ThemeEdit', params: { themeId: theme.id }}"  >
                bewerken
            </router-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</b-col>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import useRepository, { callTypes } from '../../composables/useRepository'
import ThemeRepository from '../../repositories/themeRepository'
import { repoParams } from '../../repositories/baseRepository'
import { useRouter } from '@/composables/useRouter'
import { filter } from 'vue/types/umd'

export default defineComponent({
  name: 'themes-overview',
  components: {},
  setup () {

    let callParams = reactive<repoParams>({})
    const { loading, doCall, result } = useRepository(ThemeRepository, callTypes.getModelArray, callParams)

    doCall()

    return {
      result,
      callParams
    }
  }
})
</script>
