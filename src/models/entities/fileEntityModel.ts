import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class FileEntityModel extends BaseEntityModel implements EntityModel<FileEntityModel> {

  constructor (
    public id?: string,
    public contentType?: string,
    public url?: string,
    public name?: string,
    public size?: string
  ) {
    super(id)
  }

  public static deserialize (input: any): FileEntityModel {
    return new FileEntityModel(
      input.id,
      input.content_type,
      input.url,
      input.name,
      input.size
    )
  }

  public serialize () {
    return {
      id: this.id,
      content_type: this.contentType
    }
  }

  public static serializeForWorkshop (file: FileEntityModel): String {
    return file.id ? file.id : 'no uuid'
  }

}
