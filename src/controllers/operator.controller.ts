import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Operator} from '../models';
import {OperatorRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {jwtAuthorization} from '../services/jwt.authorizor';

export class OperatorController {
  constructor(
    @repository(OperatorRepository)
    public operatorRepository : OperatorRepository,
  ) {}

  @post('/operators', {
    responses: {
      '200': {
        description: 'Operator model instance',
        content: {'application/json': {schema: getModelSchemaRef(Operator)}},
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
          schema: getModelSchemaRef(Operator, {
            title: 'NewOperator',
            exclude: ['id'],
          }),
        },
      },
    })
    operator: Omit<Operator, 'id'>,
  ): Promise<Operator> {
    return this.operatorRepository.create(operator);
  }

  @get('/operators', {
    responses: {
      '200': {
        description: 'Array of Operator model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Operator, {includeRelations: true}),
            },
          },
        },
      },
    },
  })


  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Operator)) filter?: Filter<Operator>,
  ): Promise<Operator[]> {
    return this.operatorRepository.find(filter);
  }

  @patch('/operators', {
    responses: {
      '200': {
        description: 'Operator PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operator, {partial: true}),
        },
      },
    })
    operator: Operator,
    @param.query.object('where', getWhereSchemaFor(Operator)) where?: Where<Operator>,
  ): Promise<Count> {
    return this.operatorRepository.updateAll(operator, where);
  }

  @get('/operators/{id}', {
    responses: {
      '200': {
        description: 'Operator model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Operator, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Operator)) filter?: Filter<Operator>
  ): Promise<Operator> {
    return this.operatorRepository.findById(id, filter);
  }

  @patch('/operators/{id}', {
    responses: {
      '204': {
        description: 'Operator PATCH success',
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
          schema: getModelSchemaRef(Operator, {partial: true}),
        },
      },
    })
    operator: Operator,
  ): Promise<void> {
    await this.operatorRepository.updateById(id, operator);
  }

  @put('/operators/{id}', {
    responses: {
      '204': {
        description: 'Operator PUT success',
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
    @requestBody() operator: Operator,
  ): Promise<void> {
    await this.operatorRepository.replaceById(id, operator);
  }

  @del('/operators/{id}', {
    responses: {
      '204': {
        description: 'Operator DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.operatorRepository.deleteById(id);
  }
}
