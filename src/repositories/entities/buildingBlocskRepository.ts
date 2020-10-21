import BuildingBlocksEntityModel from '../../models/entities/buildingBlocksEntityModel'
import WithTransitionRepository from '../withTransitionRepository'

export default class BuildingBlocksRepository extends WithTransitionRepository {
    id = 'building-blocks'
    endpoint = '/building_block_templates/'
    publicGet = true
    entityModel = BuildingBlocksEntityModel

    getEmptyBlock () {
      return this.get('/building_block_templates/empty_default/').then((result: any) => {
        result.title = 'Lege bouwsteen'
        result.description = ''

        return BuildingBlocksEntityModel.deserialize(result)
      })
    }

}
