import BaseRepository from './baseRepository'
import WorkshopEntityModel from '../models/entities/workshopEntityModel'

export enum transitionTypes {
  noTransition = 'noTransition',
  publish = 'publish',
  requestPublication = 'request_publication'
}

export default class WorkshopRepository extends BaseRepository {
    id = 'workshops'
    endpoint = '/workshops/'
    entityModel = WorkshopEntityModel

    transitionWorkshop (workshop: WorkshopEntityModel, transitionType) : Promise<any> {
      return this.post('/workshops/' + workshop.id + '/' + transitionType + '/', { 'id': workshop.id })
    }

}
