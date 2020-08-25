
import BaseEntityModel from '../models/entities/baseEntityModel'
import BaseApiRepository from './baseApiRepository'

type arrayEntityFilter = {
  type: 'arrayEntity'
  value: Array<BaseEntityModel> | undefined
}

type entityFilter = {
  type: 'entity'
  value: BaseEntityModel | undefined
}

type stringFilter = {
  type: 'string'
  value: string| undefined
}

type filterObject = {
  [key: string]: arrayEntityFilter | entityFilter | stringFilter
}

export type repoParams = {
  id?: string,
  filters?: filterObject,
  model?: BaseEntityModel,
  page?: number,
  isMaxPage?: boolean,
  pageSize?: number
}

export default abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint : string
  abstract entityModel: any
  abstract getFake (endpoint: string) : Promise<any>
  defaultPageSize: number = 12

  getModelArray (params: repoParams) : Promise<{result: BaseEntityModel[], params: repoParams}> {

    const urlParams = this.processUrlParams(params)

    return this.get(this.endpoint, { params: urlParams && urlParams }).then((response: any) => {
      const returnArray : BaseEntityModel[] = []

      response.results.forEach((content: any) => {
        returnArray.push(this.entityModel.deserialize(content))
      })

      params.isMaxPage = response.next === null

      return { result: returnArray, params: params }
    })
  }

  getSingle (params: repoParams) : Promise<{result: BaseEntityModel, params: repoParams }> {
    return this.get(this.endpoint + '' + params.id).then((response: any) => {
      return { result: this.entityModel.deserialize(response), params: params }
    })
  }

  create (params: repoParams) : Promise<{result: BaseEntityModel, params: repoParams }> {
    return this.post(this.endpoint, params.model && params.model.serialize()).then((response: any) => {
      return { result: this.entityModel.deserialize(response), params: params }
    })
  }

  update (params: repoParams) : Promise<{result: BaseEntityModel, params: repoParams }> {
    return this.patch(this.endpoint + '' + params.id + '/', params.model && params.model.serialize()).then((response: any) => {
      return { result: this.entityModel.deserialize(response), params: params }
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

    urlParams.append('page_size', this.getPageSize(params))

    return urlParams
  }

  private processFilters (filters: filterObject, urlParams: URLSearchParams) : URLSearchParams {

    Object.keys(filters).forEach((key: string) => {
      if (filters[key] && filters[key].value) {

        const arrayEntityFilter : arrayEntityFilter | false = this.isArrayEntityFilter(filters[key])
        console.log(arrayEntityFilter)
        if (arrayEntityFilter && arrayEntityFilter.value) {
          arrayEntityFilter.value.forEach((arrayValue: BaseEntityModel) => {
            arrayValue.id && urlParams.append(key + '[]', arrayValue.id)
          })
        }

        const entityFilter : entityFilter | false = this.isEntityFilter(filters[key])
        if (entityFilter && entityFilter.value) {
          entityFilter.value.id && urlParams.append(key, entityFilter.value.id)
        }

        const stringFilter : stringFilter | false = this.isStringFilter(filters[key])
        if (stringFilter && stringFilter.value) {
          urlParams.append(key, stringFilter.value)
        }

      }
    })

    return urlParams
  }

  private isArrayEntityFilter (filter: arrayEntityFilter | entityFilter | stringFilter): arrayEntityFilter | false {

    if (filter.type === 'arrayEntity') {
      return filter as arrayEntityFilter
    } else {
      return false
    }
  }

  private isEntityFilter (filter: arrayEntityFilter | entityFilter | stringFilter): entityFilter | false {
    if (filter.type === 'entity') {
      return filter as entityFilter
    } else {
      return false
    }
  }

  private isStringFilter (filter: arrayEntityFilter | entityFilter | stringFilter): stringFilter | false {
    if (filter.type === 'string') {
      return filter as stringFilter
    } else {
      return false
    }
  }

  private getPageSize (params: repoParams) : string {
    return params.pageSize ? params.pageSize.toString() : this.defaultPageSize.toString()
  }
}
