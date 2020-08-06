
import BaseEntityModel from '../models/entities/baseEntityModel'
import BaseApiRepository from './baseApiRepository'

export type repoParams = {
  id?: string,
  filters?: Object[],
  model?: BaseEntityModel
}

export default abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint : string
  abstract entityModel: any
  abstract getFake (endpoint: string) : Promise<any>

  getModelArray (params: repoParams) : Promise<BaseEntityModel[]> {
    return this.get(this.endpoint).then((response: any) => {
      const returnArray : BaseEntityModel[] = []

      response.forEach((content: any) => {
        returnArray.push(this.entityModel.deserialize(content))
      })

      return returnArray
    })
  }

  getSingle (params: repoParams) : Promise<BaseEntityModel> {
    return this.get(this.endpoint + '' + params.id).then((response: any) => {
      return this.entityModel.deserialize(response)
    })
  }

  create (params: repoParams) : Promise<BaseEntityModel> {
    return this.post(this.endpoint, params.model.serialize()).then((response: any) => {
      return this.entityModel.deserialize(response)
    })
  }

  update (params: repoParams) : Promise<BaseEntityModel> {
    return this.patch(this.endpoint, params.model.serialize()).then((response: any) => {
      return this.entityModel.deserialize(response)
    })
  }

}
