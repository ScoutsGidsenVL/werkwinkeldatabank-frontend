import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

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
