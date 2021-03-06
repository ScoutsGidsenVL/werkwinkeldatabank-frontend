import BaseRepository, { historyItem, repoParams } from '../repositories/baseRepository'
import RepositoryFactory from '../repositories/repositoryFactory'
import BaseEntityModel from '../models/entities/baseEntityModel'
import { ref, Ref } from '@vue/composition-api'
import store from '../store/store'
import useGlobalLoading from './useGlobalLoading'

export const RETRY_REDIRECT : string = 'retry_redirect'

export enum callTypes {
    getModelArray = 'getModelArray',
    getSingel = 'getSingle',
    create = 'create',
    update = 'update',
    history = 'getHistory'
}

export type useRepositoryType = {
  loading : Ref<Boolean>,
  doCall: () => Promise<Boolean>,
  doCallWithLoginRetry: (redirectRoute: string) => Promise<Boolean | void>,
  doCallWithLogin: (redirectRoute: string) => Promise<Boolean | void>,
  loadMore: () => void,
  result: Ref<BaseEntityModel | undefined>
  results: Ref<BaseEntityModel[] | historyItem[]>,
  historyResults: Ref<historyItem[]>
}

export default function useRepository (
  repo: new (...params: any[]) => BaseRepository,
  callType: callTypes = callTypes.getModelArray,
  params: repoParams = {}
) : useRepositoryType {
  const loading = ref<Boolean>(false)
  const activeRepo = RepositoryFactory.get(repo)
  const result = ref<BaseEntityModel | undefined>()
  const results = ref<BaseEntityModel[]>([])
  const historyResults = ref<historyItem[]>([])

  if (!params.page) {
    params.page = 1
  }

  async function doCall () : Promise<Boolean> {

    loading.value = true

    try {
      if (callType === callTypes.getModelArray) {
        const repoResponse : {result: BaseEntityModel[], params: repoParams } = await activeRepo[callType](params)
        results.value = repoResponse.result
        params = repoResponse.params
      } else if (callType === callTypes.history) {
        const repoResponse : {result: historyItem[], params: repoParams } = await activeRepo[callType](params)
        historyResults.value = repoResponse.result
      } else {
        const repoResponse : {result: BaseEntityModel, params: repoParams } = await activeRepo[callType](params)
        result.value = repoResponse.result
        params = repoResponse.params
      }

      loading.value = false
      return true
    } catch (e) {
      loading.value = false
      throw new Error(e)
    }
  }

  async function loadMore () {
    try {
      if (callType === callTypes.getModelArray && !params.isMaxPage) {
        loading.value = true
        params.page && params.page++
        const repoResponse : {result: BaseEntityModel[], params: repoParams } = await activeRepo[callType](params)
        params = repoResponse.params
        results.value = results.value.concat(repoResponse.result)
        loading.value = false
      }
    } catch (e) {
      loading.value = false
      throw new Error(e)
    }
  }

  function doCallWithLoginRetry (redirectRoute: string) : Promise<Boolean | void> {
    useGlobalLoading(loading)
    if (!sessionStorage.getItem(RETRY_REDIRECT) && localStorage.getItem('IS_LOGGED_IN')) {
      sessionStorage.setItem(RETRY_REDIRECT, redirectRoute)
      store.dispatch('openid/login').then(() => {
        doCall()
      })
    } else {
      doCall().catch(() => {
        sessionStorage.setItem(RETRY_REDIRECT, redirectRoute)
        store.dispatch('openid/login').then(() => {
          doCall()
        })
      })
    }
    return Promise.resolve(true)
  }

  function doCallWithLogin (redirectRoute: string) : Promise<Boolean | void> {
    useGlobalLoading(loading)
    sessionStorage.setItem(RETRY_REDIRECT, redirectRoute)
    store.dispatch('openid/login').then(() => {
      doCall()
    })
    return Promise.resolve(true)
  }

  return {
    loading,
    doCall,
    doCallWithLoginRetry,
    doCallWithLogin,
    result,
    results,
    historyResults,
    loadMore
  }
}
