import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import ThemeEntityModel from './themeEntityModel'

export default class WorkshopEntityModel extends BaseEntityModel implements EntityModel<WorkshopEntityModel> {

  constructor (
    public title?: String,
    public id?: String,
    public duration?: String,
    public description?: String,
    public theme?: ThemeEntityModel,
    public necessities?: String
  ) {
    super(id, title)
  }

  public static deserialize (input: any): WorkshopEntityModel {
    return new WorkshopEntityModel(
      input.title,
      input.id,
      input.duration,
      input.description,
      input.theme ? ThemeEntityModel.deserialize(input.theme) : undefined,
      input.necessities
    )
  }

  public serialize () {
    return {
      title: this.title,
      duration: this.duration,
      description: this.description,
      theme: this.theme ? this.theme.id : undefined,
      necessities: this.necessities
    }
  }

}
