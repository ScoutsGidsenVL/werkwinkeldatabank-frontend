import WorkshopRepository from './workshopRepository'

export default class PublicationRequestedWorkshopRepository extends WorkshopRepository {
    id = 'publication-requeted-workshops'
    endpoint = '/workshops/publication_requested_workshops/'
    publicGet = true
}
