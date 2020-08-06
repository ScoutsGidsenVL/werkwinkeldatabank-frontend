import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import MasterConfig from '../models/config/masterConfig'
// @ts-ignore
@Module({ namespaced: true, name: 'config' })
export default class ConfigModule extends VuexModule {

  // Data
  config: MasterConfig = new MasterConfig()

  // Mutations
  @Mutation
  setConfig (config: any) {
    this.config = config
  }

}
