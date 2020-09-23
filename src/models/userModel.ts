import Serializable from '@/interfaces/serializable'

export default class UserModel implements Serializable<UserModel> {

  constructor (
    public userName?: string,
    public firstName?: string,
    public lastName?: string,
    public permissions: Array<string> = []
  ) {
    return this
  }

  static deserialize (input: any): UserModel {
    return new UserModel(
      input.username,
      input.firstName,
      input.lastName,
      input.permissions
    )
  }

  public serialize () : Object {
    return {
      username: this.userName,
      firstname: this.firstName,
      lastName: this.lastName
    }
  }

}
