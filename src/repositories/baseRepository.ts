
import BaseEntityModel from '../models/entities/baseEntityModel'
import BaseApiRepository from './baseApiRepository'

export type repoParams = {
  id?: String
}

export default abstract class BaseRepository extends BaseApiRepository {
  abstract endpoint : string
  abstract entityModel: any
  abstract getFake (endpoint: string) : Promise<any>

  getModelArray () : Promise<BaseEntityModel[]> {
    return this.getFake(this.endpoint).then((response: any) => {
      const returnArray : BaseEntityModel[] = []

      response.forEach((content: any) => {
        returnArray.push(this.entityModel.deserialize(content))
      })

      return returnArray
    })
  }

  getSingle (params: repoParams) : Promise<BaseEntityModel> {
    return this.getFake(this.endpoint + '/' + params.id).then((response: any) => {
      return this.entityModel.deserialize(response[0])
    })
  }

}
