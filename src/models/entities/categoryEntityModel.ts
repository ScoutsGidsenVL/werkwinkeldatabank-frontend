import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class CategoryModel extends BaseEntityModel implements EntityModel<CategoryModel> {

  constructor (
    public title: string,
    public id?: string,
    public isDisabled?: boolean
  ) {
    super(id, title)
  }

  public static deserialize (input: any): CategoryModel {
    return new CategoryModel(
      input.title,
      input.id,
      input.is_disabled ? input.is_disabled : false
    )
  }

  public serialize () {
    return {
      title: this.title,
      is_disabled: this.isDisabled
    }
  }

}
