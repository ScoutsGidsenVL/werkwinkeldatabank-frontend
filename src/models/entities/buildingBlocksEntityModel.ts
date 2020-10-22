import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import CategoryModel from './categoryEntityModel'
import ThemeEntityModel from './themeEntityModel'
import { useEnum } from '../../composables/useEnum'
import UserModel from '../userModel'

export enum BuildingBlocksTypes {
  THEMATIC = 'Inhoud',
  METHODIC = 'Werkvorm'
}

export default class BuildingBlocksEntityModel extends BaseEntityModel implements EntityModel<BuildingBlocksEntityModel> {

  constructor (
    public title?: string,
    public id?: string,
    public duration?: string,
    public description?: string,
    public shortDescription?: string,
    public necessities?: string,
    public type?: BuildingBlocksTypes,
    public category?: CategoryModel,
    public theme?: ThemeEntityModel,
    public editable?: boolean,
    public isSensitive?: boolean,
    public isDisabled?: boolean,
    public order?: number,
    public template?: string,
    public BuildingblockStatus?: string,
    public createdBy?: UserModel


  ) {
    super(id, title)
  }

  public static deserialize (input: any): BuildingBlocksEntityModel {
    return new BuildingBlocksEntityModel(
      input.title,
      input.id,
      input.duration,
      input.description,
      input.short_description,
      input.building_block_necessities,
      input.type.label,
      input.category ? CategoryModel.deserialize(input.category) : undefined,
      input.theme ? ThemeEntityModel.deserialize(input.theme) : undefined,
      input.linked_template_values !== undefined ? !input.linked_template_values : !input.is_sensitive,
      input.is_sensitive,
      input.is_disabled ? input.is_disabled : false,
      input.order,
      input.template,
      input.status && input.status.value,
      input.created_by ? UserModel.deserialize(input.created_by) : undefined
    )
  }

  public serialize () : Object {
    const { convertType } = useEnum(BuildingBlocksTypes)
    const type : String | undefined = this.type && convertType(this.type)

    return {
      title: this.title,
      description: this.description,
      short_description: this.shortDescription,
      type: type,
      duration: this.duration ? this.checkDuration(this.duration) : undefined,
      category: this.type === BuildingBlocksTypes.METHODIC ? this.category?.id : null,
      theme: this.type === BuildingBlocksTypes.THEMATIC ? this.theme?.id : null,
      building_block_necessities: this.necessities,
      is_sensitive: this.isSensitive,
      is_disabled: this.isDisabled
    }
  }



  public serialzeForWorkshop () : Object {
    const returnArray: Object = {
      title: this.title,
      duration: this.duration ? this.checkDuration(this.duration) : undefined,
      description: this.description,
      category: this.type === BuildingBlocksTypes.METHODIC ? this.category?.id : null,
      theme: this.type === BuildingBlocksTypes.THEMATIC ? this.theme?.id : null,
      building_block_necessities: this.necessities ? this.necessities : '&nbsp;',
      linked_template_values: !this.editable
    }

    if (this.id) {
      returnArray['id'] = this.id
    }

    if (this.template) {
      returnArray['template'] = this.template
    }

    return returnArray
  }

  public static createNewFromTemplate (input: BuildingBlocksEntityModel, order: number) : BuildingBlocksEntityModel {
    input.template = input.id
    input.id = undefined
    input.order = order

    return input
  }

  private checkDuration (input: String) : String {
    return input.length === 5 ? input + ':00' : input
  }

}
