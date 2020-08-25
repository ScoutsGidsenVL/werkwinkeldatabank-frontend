import EntityModel from '@/interfaces/entityModel'

export default class BaseEntityModel implements EntityModel<BaseEntityModel> {

  constructor (
     public id?: string,
     public title?: string
  ) {
    return this
  }

  public static deserialize (input: any): BaseEntityModel {
    return new BaseEntityModel(
      input.id,
      input.title
    )
  }

  public serialize () : Object {
    return {
      id: this.id,
      title: this.title
    }
  }

}
