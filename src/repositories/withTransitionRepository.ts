import BaseEntityModel from '@/models/entities/baseEntityModel'
import BaseRepository from './baseRepository'

export enum transitionTypes {
  noTransition = 'noTransition',
  publish = 'publish',
  requestPublication = 'request_publication'
}

export default abstract class WithTransitionRepository extends BaseRepository {

  transitionEntity (entity: BaseEntityModel, transitionType) : Promise<any> {
    return this.post(this.endpoint + entity.id + '/' + transitionType + '/', { 'id': entity.id })
  }

}
