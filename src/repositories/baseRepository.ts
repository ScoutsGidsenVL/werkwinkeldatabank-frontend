
import BaseEntityModel from '../models/entities/baseEntityModel'
import BaseApiRepository from './baseApiRepository'
import { filter } from 'vue/types/umd'

type filterObject = {
  [key: string]: {
    type: 'string' | 'array' | 'entity',
    value: String | Array<any> | null
  }
}

export type repoParams = {
  id?: string,
  filters?: filterObject,
  model?: BaseEntityModel,
  page?: number
}

export default abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint : string
  abstract entityModel: any
  abstract getFake (endpoint: string) : Promise<any>

  getModelArray (params: repoParams) : Promise<BaseEntityModel[]> {

    const urlParams = this.processUrlParams(params)

    return this.get(this.endpoint, { params: urlParams && urlParams }).then((response: any) => {
      const returnArray : BaseEntityModel[] = []

      response.results.forEach((content: any) => {
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
    return this.post(this.endpoint, params.model && params.model.serialize()).then((response: any) => {
      return this.entityModel.deserialize(response)
    })
  }

  update (params: repoParams) : Promise<BaseEntityModel> {
    return this.patch(this.endpoint + '' + params.id + '/', params.model && params.model.serialize()).then((response: any) => {
      return this.entityModel.deserialize(response)
    })
  }

  private processUrlParams (params: repoParams) : URLSearchParams {
    let urlParams : URLSearchParams = new URLSearchParams()

    if (params.filters) {
      urlParams = this.processFilters(params.filters, urlParams)
    }

    if (params.page) {
      urlParams.append('page', params.page.toString())
    }

    return urlParams
  }

  private processFilters (filters: filterObject, urlParams: URLSearchParams) : URLSearchParams {

    Object.keys(filters).forEach((key: string) => {
      if (filters[key].value !== null) {
        switch (filters[key].type) {
        case 'array':
          filters[key].value.forEach((arrayValue: string) => {
            urlParams.append(key + '[]', arrayValue.id)
          })
          break
        case 'entity':
          urlParams.append(key, filters[key].value.id)
          break
        default:
          urlParams.append(key, filters[key].value)
          break
        }
      }
    })

    return urlParams
  }
}
