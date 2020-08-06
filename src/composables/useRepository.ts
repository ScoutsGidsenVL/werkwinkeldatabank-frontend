import BaseRepository, { repoParams } from '../repositories/baseRepository'
import RepositoryFactory from '../repositories/repositoryFactory'
import BaseEntityModel from '../models/entities/baseEntityModel'
import { ref, Ref } from '@vue/composition-api'

export enum callTypes {
    getModelArray = 'getModelArray',
    getSingel = 'getSingle',
    create = 'create'
}

export type useRepositoryType = {
  loading : Ref<Boolean>,
  doCall: () => void,
  result: Ref<BaseEntityModel[] | BaseEntityModel | null>
}

export default function useRepository (
  repo: new (...params: any[]) => BaseRepository,
  callType: callTypes = callTypes.getModelArray,
  params: repoParams = {}
) : useRepositoryType {
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
