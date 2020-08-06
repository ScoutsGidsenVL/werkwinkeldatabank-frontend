import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import MasterConfig from '../models/config/masterConfig'
// @ts-ignore
@Module({ namespaced: true, name: 'notifications' })
export default class NotificationModule extends VuexModule {

  // Data
  loading: Boolean = false

  // Mutations
  @Mutation
  setLoading (loading: Boolean) {
    this.loading = loading
  }
}
