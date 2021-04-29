import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import ThemeEntityModel from './themeEntityModel'
import BuildingBlocksEntityModel from './buildingBlocksEntityModel'
import TeamEntityModel from './teamEntityModel'
import UserModel from '../userModel'
import moment from 'moment'
import { fileReturn } from '@/repositories/entities/fileRepository'
import FileEntityModel from './fileEntityModel'
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
    public isMine?: boolean,
    public publishedAt?: string,
    public createdAt?: string,
    public files?: FileEntityModel[]
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

    const files : FileEntityModel[] = []
    input.files && input.files.forEach(file => {
      files.push(FileEntityModel.deserialize(file))
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
      input.isMine,
      input.published_at ? moment(input.published_at).format('DD/MM/YYYY').toString() : undefined,
      input.created_at ? moment(input.created_at).format('DD/MM/YYYY').toString() : undefined,
      files
    )
  }

  public serialize () : Object {
    const buildingBlocks : Object[] = []

    this.buildingBlocks && this.buildingBlocks.forEach((block: BuildingBlocksEntityModel) => {
      buildingBlocks.push(block.serialzeForWorkshop())
    })

    const themes : string[] = []

    this.theme && this.theme.forEach((theme: ThemeEntityModel) => {
      theme.id && themes.push(theme.id)
    })

    const files : String[] = []
    this.files && this.files.forEach((file: FileEntityModel) => {
      files.push(FileEntityModel.serializeForWorkshop(file))
    })

    return {
      title: this.title,
      short_description: this.shortDescription,
      description: this.description,
      themes: themes,
      necessities: this.necessities ? this.necessities : undefined,
      building_blocks: buildingBlocks,
      approving_team: this.approvingTeam ? this.approvingTeam.id : undefined,
      is_disabled: this.isDisabled,
      files: files
    }
  }


}
