import BaseRepository from '../baseRepository'
import FileEntityModel from '@/models/entities/fileEntityModel'

export type fileReturn = {
  id: string,
  url: string
}

export default class FileRepository extends BaseRepository {
    id= 'files'
    endpoint = '/files/'
    publicGet = true
    entityModel = Object

    public uploadFile (file: any): Promise<FileEntityModel> {
      const fd = new FormData()
      fd.append('upload', file)

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      return this.post(this.endpoint + 'upload/', fd, config).then((response: FileEntityModel) => {
        return response
      })
    }

    public downloadFile (id: string): Promise<Blob> {
      return this.getFile(this.endpoint + 'download/' + id).then((res) => {
        return res
      })
    }
}
