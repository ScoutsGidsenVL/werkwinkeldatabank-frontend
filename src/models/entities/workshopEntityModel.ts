import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import ThemeEntityModel from './themeEntityModel'
import BuildingBlocksEntityModel from './buildingBlocksEntityModel'

export default class WorkshopEntityModel extends BaseEntityModel implements EntityModel<WorkshopEntityModel> {

  constructor (
    public isMoving: boolean,
    public title?: string,
    public id?: string,
    public duration?: string,
    public description?: string,
    public theme?: ThemeEntityModel,
    public necessities?: string,
    public isSensitive?: boolean,
    public buildingBlocks?: BuildingBlocksEntityModel[],
    public workshopStatus?: string
  ) {
    super(id, title)
  }

  public static deserialize (input: any): WorkshopEntityModel {
    const buildingBlockArray: BuildingBlocksEntityModel[] = []
    let count: number = 0

    if (input.building_blocks) {
      input.building_blocks.forEach((block: any) => {
        block.order = count
        count++
        buildingBlockArray.push(BuildingBlocksEntityModel.deserialize(block))
      })
    }

    return new WorkshopEntityModel(
      false,
      input.title,
      input.id,
      input.duration,
      input.description,
      input.theme ? ThemeEntityModel.deserialize(input.theme) : undefined,
      input.necessities,
      input.is_sensitive,
      buildingBlockArray,
      input.workshop_status_type
    )
  }

  public serialize () {
    const buildingBlocks : Object[] = []

    this.buildingBlocks && this.buildingBlocks.forEach((block: BuildingBlocksEntityModel) => {
      buildingBlocks.push(block.serialzeForWorkshop())
    })

    return {
      title: this.title,
      description: this.description,
      theme: this.theme ? this.theme.id : undefined,
      necessities: this.necessities,
      approving_team: 'GROUP1',
      building_blocks: buildingBlocks
    }
  }

}
