import BaseEntityModel from './baseEntityModel'
import EntityModel from '@/interfaces/entityModel'

export default class TeamEntityModel extends BaseEntityModel implements EntityModel<TeamEntityModel> {

  constructor (
    public title: string,
    public id?: string,
    public value?: string
  ) {
    super(id, title)
  }

  public static deserialize (input: any): TeamEntityModel {
    return new TeamEntityModel(
      input.label,
      input.id
    )
  }

  public serialize () {
    return {
      label: this.title,
      value: this.value
    }
  }

}
