import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import ThemeEntityModel from './themeEntityModel'
import BuildingBlocksEntityModel from './buildingBlocksEntityModel'

export default class WorkshopEntityModel extends BaseEntityModel implements EntityModel<WorkshopEntityModel> {

  constructor (
    public title?: string,
    public id?: string,
    public duration?: string,
    public description?: string,
    public theme?: ThemeEntityModel,
    public necessities?: string,
    public buildingBlocks?: BuildingBlocksEntityModel[]
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
      input.necessities,
      input.buildingBlocks ? input.buildingBlocks : []
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
