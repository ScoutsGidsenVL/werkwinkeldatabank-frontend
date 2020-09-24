import store from '../store/store'

export type usePermissionsType = {
    can: (permission: string) => boolean
}

export default function usePermissions () : usePermissionsType {

  function can (permission: string) : boolean {
    return store.state.user && store.state.user.user.permissions.includes(permission)
  }

  return {
    can
  }

}
