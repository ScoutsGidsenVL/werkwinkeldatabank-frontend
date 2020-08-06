import NotificationModule from '@/store/notificationModule'
import store from '../store/store'
import { getModule } from 'vuex-module-decorators'
import { watch, Ref } from '@vue/composition-api'

export default function useGlobalLoading (loading: Ref<Boolean>) {
  const notificationModule = getModule(NotificationModule, store)

  watch(loading, value => {
    notificationModule.setLoading(value)
  })

}
