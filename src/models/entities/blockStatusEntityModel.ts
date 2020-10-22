import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class BlockStatusEntityModel extends BaseEntityModel implements EntityModel<BlockStatusEntityModel> {

  constructor (
    public title: string,
    public id?: string,
    public value?: string
  ) {
    super(id, title)
  }

  public static deserialize (input: any): BlockStatusEntityModel {
    return new BlockStatusEntityModel(
      input.label,
      input.id,
      input.value
    )
  }

  public serialize () {
    return {
      label: this.title,
      value: this.value
    }
  }

}
