import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class ThemeEntityModel extends BaseEntityModel implements EntityModel<ThemeEntityModel> {

  constructor (
    public title: String,
    public id?: String
  ) {
    super(id, title)
  }

  public static deserialize (input: any): ThemeEntityModel {
    return new ThemeEntityModel(
      input.title,
      input.id
    )
  }

}
