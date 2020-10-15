import WorkshopRepository from './workshopRepository'

export default class PrivatePublishedWorkshopRepository extends WorkshopRepository {
    id = 'private-published-workshops'
    publicGet = false
}
