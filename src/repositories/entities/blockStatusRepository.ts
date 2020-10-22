import BaseRepository from '../baseRepository'
import BlockStatusEntityModel from '@/models/entities/blockStatusEntityModel'


export default class BlockStatusRepository extends BaseRepository {
    id= '/building_block_statuses/'
    endpoint = '/building_block_statuses/'
    publicGet= false
    entityModel = BlockStatusEntityModel

}
