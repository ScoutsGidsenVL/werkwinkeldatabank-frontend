import BaseRepository, { historyItem, repoParams } from '../repositories/baseRepository'
import RepositoryFactory from '../repositories/repositoryFactory'
import BaseEntityModel from '../models/entities/baseEntityModel'
import { ref, Ref } from '@vue/composition-api'

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
  loadMore: () => void,
  result: Ref<BaseEntityModel | undefined>
  results: Ref<BaseEntityModel[] | historyItem[]>
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
      } else {
        const repoResponse : {result: BaseEntityModel | historyItem[], params: repoParams } = await activeRepo[callType](params)
        // @ts-ignore
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

  return {
    loading,
    doCall,
    result,
    results,
    loadMore
  }
}
