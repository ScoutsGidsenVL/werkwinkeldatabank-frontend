import axios, { AxiosResponse } from 'axios'
import store from '../store/store'

export default class StaticFileRepository {
  private getScriptUrl (): string {
    let url = ''
    const myScript = document.currentScript
    if (myScript) {
      const mySrc = myScript.getAttribute('src')
      if (mySrc) {
        const urlArray = mySrc.split('/')
        url = urlArray.slice(0, urlArray.length - 1).join('/')
      }
    }

    return url
  }

  public getFile (fileUrl: string): Promise<any> {
    return axios
      .get(this.getScriptUrl() + '/' + fileUrl)
      .then(function (result: AxiosResponse) {
        return result.data
      })
  }
}
