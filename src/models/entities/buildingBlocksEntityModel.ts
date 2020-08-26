import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

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
    public type?: BuildingBlocksTypes
  ) {
    super(id, title)
  }

  public static deserialize (input: any): BuildingBlocksEntityModel {
    return new BuildingBlocksEntityModel(
      input.title,
      input.id,
      input.duration,
      input.description,
      input.type.id
    )
  }

  public serialize () {
    return {
      title: this.title,
      duration: this.duration,
      description: this.description,
      type: this.type
    }
  }

}
