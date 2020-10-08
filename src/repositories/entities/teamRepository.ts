import BaseRepository from '../baseRepository'
import TeamEntityModel from '@/models/entities/teamEntityModel'


export default class TeamRepository extends BaseRepository {
    id= 'team'
    endpoint = '/teams/'
    publicGet= false
    entityModel = TeamEntityModel

}
