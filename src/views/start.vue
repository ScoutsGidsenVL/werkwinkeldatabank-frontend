<template>
<div></div>
</template>

<script lang="ts">
import { useRouter } from '@/composables/useRouter'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent } from '@vue/composition-api'
import AuthRepository from '../repositories/authRepository'

export default defineComponent({
  name: 'start-view',

  setup (props, { root }) {
    const { route, router } = useRouter()
    const startPage : string = 'WerkwinkelOverview'

    // Custom start view to work with the inuits oicd/Keycloak when vue is not in history mode

    // check if auth code from Keycloack is there
    let params = (new URL(document.location.toString())).searchParams
    let code = params.get('code')

    code
      // Fetch the tokens and remove the url params on succes and redirect to /#/ no history mode path
      ? root.$store.dispatch('openid/fetchTokens', code).then(
        (redirectPath) => {
          RepositoryFactory.get(AuthRepository).me()
          // const url = new URL(location.toString())
          // url.searchParams.delete('code')
          // url.searchParams.delete('session_state')
          // window.location.replace(url.toString())
        },
        (error) => {
          // router.push({ name: startPage })
        })
      : router.push({ name: startPage })

    return {
    }
  }
})
</script>
