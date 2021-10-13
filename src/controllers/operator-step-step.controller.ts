import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OperatorStep,
  Step,
} from '../models';
import {OperatorStepRepository} from '../repositories';

export class OperatorStepStepController {
  constructor(
    @repository(OperatorStepRepository)
    public operatorStepRepository: OperatorStepRepository,
  ) { }

  @get('/operator-steps/{id}/step', {
    responses: {
      '200': {
        description: 'Step belonging to OperatorStep',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Step)},
          },
        },
      },
    },
  })
  async getStep(
    @param.path.number('id') id: typeof OperatorStep.prototype.id,
  ): Promise<Step> {
    return this.operatorStepRepository.step(id);
  }
}
