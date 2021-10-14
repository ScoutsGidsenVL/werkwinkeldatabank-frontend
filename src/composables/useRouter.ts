import { computed, getCurrentInstance } from '@vue/composition-api'
import { useRepositoryType } from './useRepository'

export const useRouter = () => {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new ReferenceError('Not found vue instance.')
  }

  const route = computed(() => vm.$route)

  const router = vm.$router

  const redirectOnResult = (redirectRoute: string, repo: useRepositoryType, paramIdentifier: string) => {
    const routerObject = { name: redirectRoute, params: {} }
    if (paramIdentifier) {
      routerObject['params'] = { }
      if (repo && repo.result && repo.result.value) {
        if (repo.result.value.title) {
          routerObject.params['itemTitle'] = repo.result.value.title
        } else {
          routerObject.params[paramIdentifier] = repo.result.value.id
        }
      }
    }

    router.push(routerObject)
  }

  return { route, router, redirectOnResult } as const
}
