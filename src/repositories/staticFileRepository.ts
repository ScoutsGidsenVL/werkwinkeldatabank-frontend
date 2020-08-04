import axios, { AxiosResponse } from 'axios'
import store from '../store/store'

export default class StaticFileRepository {

  public getFile (fileUrl: string): Promise<any> {
    return axios.get(process.env.BASE_URL + fileUrl).then(function (result: AxiosResponse) {
      // Only return the data of response
      return result.data
    })
  }
}
