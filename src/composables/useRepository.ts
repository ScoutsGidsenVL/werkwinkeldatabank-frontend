import BaseRepository, { repoParams } from '../repositories/baseRepository'
import RepositoryFactory from '../repositories/repositoryFactory'
import BaseEntityModel from '../models/entities/baseEntityModel'

import { ref } from '@vue/composition-api'

export enum callTypes {
    getModelArray = 'getModelArray',
    getSingel = 'getSingle'
}

export default function useRepository (
  repo: BaseRepository,
  callType: callTypes = callTypes.getModelArray,
  params: repoParams = {}
) {
  const loading = ref<Boolean>(false)
  const activeRepo = RepositoryFactory.get(repo)
  const result = ref<BaseEntityModel[] | BaseEntityModel | null>(null)

  async function doCall () {
    loading.value = true
    result.value = await activeRepo[callType](params)
    loading.value = false
  }

  return {
    loading,
    doCall,
    result
  }
}
