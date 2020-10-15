import BuildingBlocksRepository from './buildingBlocskRepository'

export default class PrivateBuildingBlocksRepository extends BuildingBlocksRepository {
    id = 'private-building-blocks'
    publicGet = false

}

