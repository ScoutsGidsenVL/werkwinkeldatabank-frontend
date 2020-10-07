import Serializable from '@/interfaces/serializable'

export default class UserModel {

  constructor (
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public permissions: Array<string> = [
      'workshops.view_theme',
      'workshops.view_buildingblocktemplate',
      'workshops.change_workshop'
    ]
  ) {
    return this
  }

  public static deserialize (input: any): UserModel {
    return new UserModel(
      input.id,
      input.first_name,
      input.last_name,
      input.permissions
    )
  }

}
