import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'
import CategoryModel from './categoryEntityModel'

export enum BuildingBlocksTypes {
  THEMATIC = 'THEMATIC',
  METHODIC = 'METHODIC'
}

export default class BuildingBlocksEntityModel extends BaseEntityModel implements EntityModel<BuildingBlocksEntityModel> {

  constructor (
    public title?: string,
    public id?: string,
    public duration?: string,
    public description?: string,
    public shortDescription?: string,
    public type?: BuildingBlocksTypes,
    public category?: CategoryModel,
    public template?: string
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
      input.type.id,
      input.category ? CategoryModel.deserialize(input.category) : undefined
    )
  }

  public serialize () : Object {
    return {
      title: this.title,
      duration: this.duration,
      description: this.description,
      short_description: this.shortDescription,
      type: this.type,
      category: this.category?.id
    }
  }

  public serialzeForWorkshop () : Object {
    const returnArray: Object = {
      title: this.title,
      duration: this.duration,
      description: this.description
    }

    if (this.id) {
      returnArray['id'] = this.id
    }

    if (this.template) {
      returnArray['template'] = this.template
    }

    return returnArray
  }

  public static getTypesArray (): String[] {
    let returnArray : String[] = []
    Object.keys(BuildingBlocksTypes).forEach((key: any) => returnArray.push(BuildingBlocksTypes[key]))
    return returnArray
  }

  public static createNewFromTemplate (input: BuildingBlocksEntityModel) : BuildingBlocksEntityModel {
    input.template = input.id
    input.id = undefined

    return input
  }

}
