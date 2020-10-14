import BaseRepository from '../baseRepository'
import ThemeEntityModel from '@/models/entities/themeEntityModel'
import ThemeRepository from './themeRepository'


export default class PrivateThemeRepository extends ThemeRepository {
    id='private-themes'
    publicGet= false

}
