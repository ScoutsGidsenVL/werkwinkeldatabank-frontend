import UserModel from '@/models/userModel'
import AuthRepository from '@/repositories/authRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'user' })
export default class userModule extends VuexModule {

  // Data
  user: UserModel = new UserModel()
  loaded : boolean = false


  // Mutations
  @Action({})
  getMe () {
    return new Promise((resolve, reject) => {
      if (!this.loaded) {
        const authRepo : AuthRepository = RepositoryFactory.get(AuthRepository)
        authRepo.me().then((user : UserModel) => {
          this.context.commit('setUser', user)

          //   if (this.permissionService.can('can_impersonate')) {
          //     this.context.commit('setRole', 'role_super_admin')
          //     this.context.dispatch('getRoles')
          //     this.context.commit('setSuperAdmin')
          //   }
          this.context.commit('setLoaded')
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  @Mutation
  setLoaded () {
    this.loaded = true
  }

}
