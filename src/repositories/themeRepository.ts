import BaseRepository from './baseRepository'
import ThemeEntityModel from '@/models/entities/themeEntityModel'


export default class ThemeRepository extends BaseRepository {
    id= 'themes'
    endpoint = '/themes'
    entityModel = ThemeEntityModel

    getFake (endpoint: string) {
      return Promise.resolve([
        {
          'id': '33bb0eea-9262-4360-828e-7b5ea06a8045',
          'title': 'Alcohol'
        },
        {
          'id': 'd7a8a291-68e2-40e1-ad2d-fe7f5533e135',
          'title': 'Buitenspelen'
        }
      ])
    }
}
