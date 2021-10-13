import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Step,
  Design,
} from '../models';
import {StepRepository} from '../repositories';

export class StepDesignController {
  constructor(
    @repository(StepRepository)
    public stepRepository: StepRepository,
  ) { }

  @get('/steps/{id}/design', {
    responses: {
      '200': {
        description: 'Design belonging to Step',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Design)},
          },
        },
      },
    },
  })
  async getDesign(
    @param.path.number('id') id: typeof Step.prototype.id,
  ): Promise<Design> {
    return this.stepRepository.design(id);
  }
}
