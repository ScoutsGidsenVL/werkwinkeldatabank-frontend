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

    const buildingBlockArray: BuildingBlocksEntityModel[] = []
    if (input.building_blocks) {
      input.building_blocks.forEach((block: any) => {
        buildingBlockArray.push(BuildingBlocksEntityModel.deserialize(block))
      })
    }

    return new WorkshopEntityModel(
      input.title,
      input.id,
      input.duration,
      input.description,
      input.theme ? ThemeEntityModel.deserialize(input.theme) : undefined,
      input.necessities,
      buildingBlockArray
    )
  }

  public serialize () {
    const buildingBlocks : Object[] = []

    this.buildingBlocks && this.buildingBlocks.forEach((block: BuildingBlocksEntityModel) => {
      buildingBlocks.push(block.serialzeForWorkshop())
    })

    return {
      title: this.title,
      duration: this.duration,
      description: this.description,
      theme: this.theme ? this.theme.id : undefined,
      necessities: this.necessities,
      building_blocks: buildingBlocks,
      is_sensitive: 'false'
    }
  }

}
