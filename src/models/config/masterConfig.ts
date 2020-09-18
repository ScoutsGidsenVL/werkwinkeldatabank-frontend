import Serializable from '../../interfaces/serializable'
import ApiConfig from './apiConfig'
import OidcConfig from './oidcConfig'
// import SentryConfig from './sentryConfig'


export default class MasterConfig implements Serializable<MasterConfig> {
  api !: ApiConfig
  oidc!: OidcConfig
  //   sentry!: SentryConfig

  deserialize (input: any) {
    if (input.api) {
      this.api = new ApiConfig().deserialize(input.api)
    }
    // if (input.oidc) {
    //   this.oidc = new OidcConfig().deserialize(input.oidc)
    // }
    // if (input.sentry) {
    //   this.sentry = new SentryConfig().deserialize(input.sentry)
    // }

    return this
  }
}
