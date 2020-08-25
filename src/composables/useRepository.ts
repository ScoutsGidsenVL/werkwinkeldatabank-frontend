import BaseRepository, { repoParams } from '../repositories/baseRepository'
import RepositoryFactory from '../repositories/repositoryFactory'
import BaseEntityModel from '../models/entities/baseEntityModel'
import { ref, Ref } from '@vue/composition-api'

export enum callTypes {
    getModelArray = 'getModelArray',
    getSingel = 'getSingle',
    create = 'create',
    update = 'update'
}

export type useRepositoryType = {
  loading : Ref<Boolean>,
  doCall: () => void,
  loadMore: () => void,
  result: Ref<BaseEntityModel | undefined>
  results: Ref<BaseEntityModel[]>
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

  async function doCall () {
    loading.value = true

    if (callType === callTypes.getModelArray) {
      const repoResponse : {result: BaseEntityModel[], params: repoParams } = await activeRepo[callType](params)
      results.value = repoResponse.result
      params = repoResponse.params
    } else {
      const repoResponse : {result: BaseEntityModel, params: repoParams } = await activeRepo[callType](params)
      result.value = repoResponse.result
      params = repoResponse.params
    }

    loading.value = false
  }

  async function loadMore () {
    if (callType === callTypes.getModelArray && !params.isMaxPage) {
      loading.value = true
      params.page && params.page++
      const repoResponse : {result: BaseEntityModel[], params: repoParams } = await activeRepo[callType](params)
      params = repoResponse.params
      results.value = results.value.concat(repoResponse.result)
      loading.value = false
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
