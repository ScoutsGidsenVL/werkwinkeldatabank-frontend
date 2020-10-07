import { ref } from '@vue/composition-api'

export default function useToast (root) {

  const send = (msg: string, variant: string = 'success') => {
    const vNodes = root.$createElement('div', {}, [
      root.$createElement('strong', {}, msg)
    ])
    root.$bvToast.toast(vNodes, {
      autoHideDelay: 5000,
      appendToast: false,
      noCloseButton: true,
      variant: variant
    })
  }

  return { send }
}
