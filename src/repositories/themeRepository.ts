import BaseRepository from './baseRepository'
import ThemeEntityModel from '@/models/entities/themeEntityModel'


export default class ThemeRepository extends BaseRepository {
    id= 'themes'
    endpoint = '/themes/'
    entityModel = ThemeEntityModel

}
