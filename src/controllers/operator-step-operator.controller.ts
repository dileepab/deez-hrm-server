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
  Operator,
} from '../models';
import {OperatorStepRepository} from '../repositories';

export class OperatorStepOperatorController {
  constructor(
    @repository(OperatorStepRepository)
    public operatorStepRepository: OperatorStepRepository,
  ) { }

  @get('/operator-steps/{id}/operator', {
    responses: {
      '200': {
        description: 'Operator belonging to OperatorStep',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Operator)},
          },
        },
      },
    },
  })
  async getOperator(
    @param.path.number('id') id: typeof OperatorStep.prototype.id,
  ): Promise<Operator> {
    return this.operatorStepRepository.operator(id);
  }
}
