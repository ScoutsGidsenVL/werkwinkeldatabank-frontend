import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import ThemeEntityModel from './themeEntityModel'
import BuildingBlocksEntityModel from './buildingBlocksEntityModel'
import TeamEntityModel from './teamEntityModel'
import UserModel from '../userModel'

export default class WorkshopEntityModel extends BaseEntityModel implements EntityModel<WorkshopEntityModel> {

  constructor (
    public isMoving: boolean,
    public title?: string,
    public id?: string,
    public duration?: string,
    public shortDescription?: string,
    public description?: string,
    public theme?: ThemeEntityModel[],
    public necessities?: string,
    public isSensitive?: boolean,
    public buildingBlocks?: BuildingBlocksEntityModel[],
    public workshopStatus?: string,
    public approvingTeam?: TeamEntityModel,
    public createdBy?: UserModel,
    public isDisabled?: boolean,
    public isMine?:boolean
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

    const themes : ThemeEntityModel[] = []
    input.themes && input.themes.forEach((themeInput: any) => {
      themes.push(ThemeEntityModel.deserialize(themeInput))
    })

    return new WorkshopEntityModel(
      false,
      input.title,
      input.id,
      input.duration,
      input.short_description,
      input.description,
      themes,
      input.necessities,
      input.is_sensitive,
      buildingBlockArray,
      input.workshop_status_type,
      input.approving_team ? TeamEntityModel.deserialize(input.approving_team) : undefined,
      input.created_by ? UserModel.deserialize(input.created_by) : undefined,
      input.is_disabled ? input.is_disabled : false,
      input.isMine
    )
  }

  public serialize () {
    const buildingBlocks : Object[] = []

    this.buildingBlocks && this.buildingBlocks.forEach((block: BuildingBlocksEntityModel) => {
      buildingBlocks.push(block.serialzeForWorkshop())
    })

    const themes : string[] = []

    this.theme && this.theme.forEach((theme: ThemeEntityModel) => {
      theme.id && themes.push(theme.id)
    })

    return {
      title: this.title,
      short_description: this.shortDescription,
      description: this.description,
      themes: themes,
      necessities: this.necessities ? this.necessities : undefined,
      building_blocks: buildingBlocks,
      approving_team: this.approvingTeam ? this.approvingTeam.id : undefined,
      is_disabled: this.isDisabled
    }
  }

}
