import BaseEntityModel from '@/models/entities/baseEntityModel'
import RepositoryFactory from '@/repositories/repositoryFactory'
import WithTransitionRepository, { transitionTypes } from '@/repositories/withTransitionRepository'
import { ref } from '@vue/composition-api'
import { useRouter } from './useRouter'
import useToast from './useToast'

export type useTransitionType = {
    afterSubmit: (result: BaseEntityModel) => void,
    saveAndPublish: () => void
}

export default function useTransitions (
  repo: new (...params: any[]) => WithTransitionRepository,
  redirectRoute: string,
  root
) {
  const { route, router } = useRouter()
  const activeRepo = RepositoryFactory.get(repo)
  const publishWorkshop = ref<transitionTypes>(transitionTypes.noTransition)
  const toast = useToast(root)

  const afterSubmit = (result: BaseEntityModel) : void => {
    if (publishWorkshop.value !== transitionTypes.noTransition) {
      activeRepo.transitionEntity(result, publishWorkshop.value).then(() => {
        publishWorkshop.value = transitionTypes.noTransition
        result.id && router.push({ name: redirectRoute, params: { 'workshopId': result.id } })
      })
    }
  }

  const saveAndPublish = (customHandleSubmit, onSubmit, validate, transition : transitionTypes) => {
    validate().then((valid: boolean) => {
      if (valid) {
        publishWorkshop.value = transition
        customHandleSubmit(onSubmit, validate)
      } else {
        toast.send('Niet alle velden zijn correct ingevuled', 'danger')
      }
    })
  }

  return {
    afterSubmit,
    saveAndPublish
  }
}
