import store from '../store/store'
import { getModule } from 'vuex-module-decorators'
import userModule from '@/store/userModule'

export type usePermissionsType = {
    can: (permission: string) => boolean
}

export default function usePermissions () : usePermissionsType {
  const userStoreModule = getModule(userModule, store)

  function can (permission: string) : boolean {
    return userStoreModule.getUser.permissions.includes(permission)
  }

  return {
    can
  }

}
