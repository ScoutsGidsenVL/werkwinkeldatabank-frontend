import BaseRepository from '../baseRepository'
import CategoryEntityModel from '@/models/entities/categoryEntityModel'
import CategoriesRepository from './categoriesRepository'


export default class PrivateCategoriesRepository extends CategoriesRepository {
    id='private-categories'
    publicGet = false

}
