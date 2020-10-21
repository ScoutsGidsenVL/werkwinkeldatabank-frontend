import { saveAs } from 'file-saver'
import { watch, Ref } from '@vue/composition-api'

export default function useDownload () {

  const DownloadFile = (response: Blob, fileName: string) => {
    // handle repsone from server to pdf download
    saveAs(response, fileName)
  }

  return {
    DownloadFile
  }

}
