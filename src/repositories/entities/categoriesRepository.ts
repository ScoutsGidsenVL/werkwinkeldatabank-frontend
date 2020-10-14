import BaseRepository from '../baseRepository'
import CategoryEntityModel from '@/models/entities/categoryEntityModel'


export default class CategoriesRepository extends BaseRepository {
    id= 'categories'
    endpoint = '/categories/'
    publicGet = true
    entityModel = CategoryEntityModel

}
