import BaseRepository from './baseRepository'
import BuildingBlocksEntityModel from '../models/entities/buildingBlocksEntityModel'


export default class BuildingBlocksRepository extends BaseRepository {
    id = 'building-blocks'
    endpoint = '/building_block_templates/'
    entityModel = BuildingBlocksEntityModel

    getFake (endpoint: string) {
      return Promise.resolve([])
    }
}
