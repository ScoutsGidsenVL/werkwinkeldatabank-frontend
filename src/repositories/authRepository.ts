
import UserModel from '@/models/userModel'
import BaseApiRepository from './baseApiRepository'

export default class AuthRepository extends BaseApiRepository {
  id = 'AuthRepository'

  me () : Promise<UserModel> {
    return this.get('/auth/me/').then((input: any) => {
      return UserModel.deserialize(input)
    })
  }


}
