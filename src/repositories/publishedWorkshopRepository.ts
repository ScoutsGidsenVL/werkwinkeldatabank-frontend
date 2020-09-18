import WorkshopRepository from './workshopRepository'

export default class PublishedWorkshopRepository extends WorkshopRepository {
    id = 'published-workshops'
    endpoint = '/workshops/published_workshops/'
}
