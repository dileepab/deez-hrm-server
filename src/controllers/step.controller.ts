import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Step} from '../models';
import {StepRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {jwtAuthorization} from '../services/jwt.authorizor';

export class StepController {
  constructor(
    @repository(StepRepository)
    public stepRepository : StepRepository,
  ) {}

  @post('/steps', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {'application/json': {schema: getModelSchemaRef(Step)}},
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Step, {
            title: 'NewStep',
            exclude: ['id'],
          }),
        },
      },
    })
    step: Omit<Step, 'id'>,
  ): Promise<Step> {
    return this.stepRepository.create(step);
  }

 @post('/steps-multi', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {'application/json': {schema: getModelSchemaRef(Step)}},
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async createAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Step, {
            title: 'NewStep',
            exclude: ['id'],
          }),
        },
      },
    })
    steps: Omit<Step, 'id'>[],
  ): Promise<Step[]> {
    return this.stepRepository.createAll(steps);
  }

  @get('/steps', {
    responses: {
      '200': {
        description: 'Array of Step model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Step, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Step)) filter?: Filter<Step>,
  ): Promise<Step[]> {
    return this.stepRepository.find(filter);
  }


  @get('/steps/{id}', {
    responses: {
      '200': {
        description: 'Step model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Step, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Step)) filter?: Filter<Step>
  ): Promise<Step> {
    return this.stepRepository.findById(id, filter);
  }

  @patch('/steps/{id}', {
    responses: {
      '204': {
        description: 'Step PATCH success',
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Step, {partial: true}),
        },
      },
    })
    step: Step,
  ): Promise<void> {
    await this.stepRepository.updateById(id, step);
  }

  @put('/steps/{id}', {
    responses: {
      '204': {
        description: 'Step PUT success',
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() step: Step,
  ): Promise<void> {
    await this.stepRepository.replaceById(id, step);
  }

  @del('/steps/{id}', {
    responses: {
      '204': {
        description: 'Step DELETE success',
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stepRepository.deleteById(id);
  }
}
