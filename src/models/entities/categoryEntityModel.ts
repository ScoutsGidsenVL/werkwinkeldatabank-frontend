import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class CategoryModel extends BaseEntityModel implements EntityModel<CategoryModel> {

  constructor (
    public title: string,
    public id?: string
  ) {
    super(id, title)
  }

  public static deserialize (input: any): CategoryModel {
    return new CategoryModel(
      input.title,
      input.id
    )
  }

  public serialize () {
    return {
      title: this.title
    }
  }

}
