import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class ThemeEntityModel extends BaseEntityModel implements EntityModel<ThemeEntityModel> {

  constructor (
    public title: string,
    public id?: string,
    public description?: string,
    public isDisabled?: boolean

  ) {
    super(id, title)
  }

  public static deserialize (input: any): ThemeEntityModel {
    return new ThemeEntityModel(
      input.title,
      input.id,
      input.description,
      input.is_disabled ? input.is_disabled : false
    )
  }

  public serialize () {
    return {
      title: this.title,
      description: this.description,
      is_disabled: this.isDisabled
    }
  }

}
