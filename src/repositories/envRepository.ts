export default class EnvRepository {

  public getEnvVars (): any {

    return {
      'api': {
        'baseUrl': process.env.VUE_APP_BASEURL,
        'apiSuffix': process.env.VUE_APP_APISUFFIX
      }
    }
  }
}
