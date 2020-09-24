import UserModel from '@/models/userModel'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import AuthRepository from '@/repositories/authRepository'
import WorkshopRepository from '@/repositories/entities/workshopRepository'

@Module({ namespaced: true, name: 'user' })
export default class userModule extends VuexModule {

  // Data
  user: UserModel = new UserModel()
  loaded : boolean = false
  // Mutations
  @Action({})
  setMe (user: UserModel) {
    return new Promise((resolve, reject) => {
      if (!this.loaded) {
        this.context.commit('setUser', user)
        this.context.commit('setLoaded')
        resolve()
      } else {
        resolve()
      }
    })
  }

  @Mutation
  setLoaded () {
    this.loaded = true
  }

  @Mutation
  setUser (user: UserModel) {
    this.user = user
  }

  get getUser () : UserModel {
    return this.user
  }

}
