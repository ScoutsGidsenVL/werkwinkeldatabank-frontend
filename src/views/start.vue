<template>
<div></div>
</template>

<script lang="ts">
import { useRouter } from '@/composables/useRouter'
import UserModel from '@/models/userModel'
import AuthRepository from '@/repositories/authRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import store from '@/store/store'
import userModule from '@/store/userModule'
import { defineComponent } from '@vue/composition-api'
import { getModule } from 'vuex-module-decorators'

export default defineComponent({
  name: 'start-view',

  setup (props, { root }) {
    const { route, router } = useRouter()
    const startPage : string = 'WerkwinkelOverview'

    // Custom start view to work with the inuits oicd/Keycloak when vue is not in history mode

    // check if auth code from Keycloack is there
    let params = (new URL(document.location.toString())).searchParams
    let code = params.get('code')

    const userStoreModule = getModule(userModule, store)

    if (code) {
      // Fetch the tokens and remove the url params on succes and redirect to /#/ no history mode path
      root.$store.dispatch('openid/fetchTokens', code).then(
        (redirectPath) => {
          const url = new URL(location.toString())
          url.searchParams.delete('code')
          url.searchParams.delete('session_state')
          window.location.replace(url.toString())
        },
        (error) => {
          // router.push({ name: startPage })
        })
    } else {
      // if (root.$store.state.openid.accesToken) {
      //   RepositoryFactory.get(AuthRepository).me().then((user: any) => {
      //     root.$store.dispatch('user/setMe', user).then(() => {
      //       router.push({ name: startPage })
      //     })
      //   })
      // } else {
      router.push({ name: startPage })
      // }
    }
    return {
    }
  }
})
</script>
