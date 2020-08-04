import BaseRepository from './baseRepository'
import WorkshopEntityModel from '../models/entities/workshopEntityModel'


export default class WorkshopRepository extends BaseRepository {
    endpoint = '/workshops'
    entityModel = WorkshopEntityModel

    getFake (endpoint: string) {
      return Promise.resolve([
        {
          'title': 'Werkwinkel 1',
          'id': '771a4022-d644-11ea-87d0-0242ac130003',
          'duration': '1 uur',
          'description': '<p>Test test …&nbsp;</p>',
          'theme': '33bb0eea-9262-4360-828e-7b5ea06a8045',
          'necessities': 'wat is dit'
        },
        {
          'title': 'Werkwinkel 2',
          'id': '8d42e919-7711-4eca-8598-4d54f34fdc34',
          'duration': '2 uur',
          'description': '<p>Test test …&nbsp;</p>',
          'theme': '33bb0eea-9262-4360-828e-7b5ea06a8045',
          'necessities': 'wat is dit'
        }
      ])
    }
}
