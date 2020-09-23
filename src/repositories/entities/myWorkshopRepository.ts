import WorkshopRepository from './workshopRepository'

export default class MyWorkshopRepository extends WorkshopRepository {
    id = 'my-workshops'
    endpoint = '/workshops/my_workshops/'
    publicGet = false
}
