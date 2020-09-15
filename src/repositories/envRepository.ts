export default class EnvRepository {

  public getEnvVars (): any {
    console.log(process.env)
    return {
      'api': {
        'baseUrl': process.env.VUE_APP_BASEURL,
        'apiSuffix': process.env.VUE_APP_APISUFFIX
      }
    }
  }
}
