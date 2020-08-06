import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { getModule } from 'vuex-module-decorators'
import store from '../store/store'
import configModule from '../store/configModule'
import MasterConfig from '../models/config/masterConfig'

// import { OpenIdConnectInterceptors } from 'inuits-vuejs-oidc'

export default abstract class BaseApiRepository {
  private axiosInstance: AxiosInstance

  constructor () {
    const config: MasterConfig = getModule(configModule, store).config

    this.axiosInstance = axios.create({
      baseURL: config.api.baseUrl + '/' + config.api.apiSuffix
    })

    // Add oidc interceptors
    // if (config.oidc && config.oidc.baseUrl && config.oidc.clientId) {
    //   this.axiosInstance.interceptors.request.use(
    //     OpenIdConnectInterceptors.buildRequestTokenInterceptorCallback(store)
    //   )

    //   this.axiosInstance.interceptors.response.use(
    //     function (response) { return response },
    //     error => OpenIdConnectInterceptors.buildResponseErrorInterceptorCallback(error, store)
    //   )

    // }
  }

  protected get (endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance.get(endpoint, config).then(function (result: AxiosResponse) {
      // Only return the data of response
      return result.data
    }).catch((error: any) => {
      return this.processError(error)
    })
  }

  protected getFile (endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
    config = {
      ...config,
      responseType: 'blob'
    }
    return this.axiosInstance.get(endpoint, config).then(function (result: AxiosResponse) {
      // Only return the data of response
      return result.data
    })
  }

  protected post (endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance.post(endpoint, data, config).then(function (result: AxiosResponse) {
      // Only return the data of response
      return result.data
    }).catch((error: any) => {
      return this.processError(error)
    })
  }

  protected patch (endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance.patch(endpoint, data, config).then(function (result: AxiosResponse) {
      // Only return the data of response
      return result.data
    }).catch((error: any) => {
      return this.processError(error)
    })
  }

  protected delete (endpoint: string): Promise<any> {
    return this.axiosInstance.delete(endpoint).then(function (result: AxiosResponse) {
      // Only return the data of response
      return result.data
    }).catch((error: any) => {
      return this.processError(error)
    })
  }

  private processError (error: any) : void {
    console.log(error.response.data)
  }

}
