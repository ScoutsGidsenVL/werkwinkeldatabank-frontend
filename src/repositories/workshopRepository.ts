import BaseRepository from './baseRepository'
import WorkshopEntityModel from '../models/entities/workshopEntityModel'


export default class WorkshopRepository extends BaseRepository {
    id = 'workshops'
    endpoint = '/workshops/'
    entityModel = WorkshopEntityModel

}
