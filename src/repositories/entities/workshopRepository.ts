import WorkshopEntityModel from '../../models/entities/workshopEntityModel'
import WithTransitionRepository from '../withTransitionRepository'

export default class WorkshopRepository extends WithTransitionRepository {
    id = 'workshops'
    endpoint = '/workshops/'
    publicGet = true
    entityModel = WorkshopEntityModel

    getDownload (workshop: WorkshopEntityModel) : Promise<any> {
      return this.getFile('/workshops/' + workshop.id + '/download')
    }

}
