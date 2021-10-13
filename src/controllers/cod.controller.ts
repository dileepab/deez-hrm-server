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
import {Cod} from '../models';
import {CodRepository} from '../repositories';
import _ from 'lodash';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {jwtAuthorization} from '../services/jwt.authorizor';

export class CodController {
  constructor(
    @repository(CodRepository)
    public codRepository : CodRepository,
  ) {}

  @post('/cod', {
    responses: {
      '200': {
        description: 'Cod model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cod)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cod, {
            title: 'NewCod',
            exclude: ['id'],
          }),
        },
      },
    })
    cod: Omit<Cod, 'id'>,
  ): Promise<Cod> {
    return this.codRepository.create(cod);
  }

  @post('/cod-multiple', {
    responses: {
      '200': {
        description: 'Cod model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cod)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async createAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cod, {
            title: 'NewCod',
            exclude: ['id'],
          }),
        },
      },
    })
    cods: Omit<Cod, 'id'>[],
  ): Promise<Cod[]> {
    return this.codRepository.createAll(cods);
  }

  @get('/cod/count', {
    responses: {
      '200': {
        description: 'Cod model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cod)) where?: Where<Cod>,
  ): Promise<Count> {
    return this.codRepository.count(where);
  }

  @get('/cod', {
    responses: {
      '200': {
        description: 'Array of Cod model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cod, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cod)) filter?: Filter<Cod>,
  ): Promise<Cod[]> {
    return this.codRepository.find(filter);
  }

  @patch('/cod', {
    responses: {
      '200': {
        description: 'Cod PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cod, {partial: true}),
        },
      },
    })
    cod: Cod,
    @param.query.object('where', getWhereSchemaFor(Cod)) where?: Where<Cod>,
  ): Promise<Count> {
    return this.codRepository.updateAll(cod, where);
  }

  @get('/cod/{id}', {
    responses: {
      '200': {
        description: 'Cod model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cod, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Cod)) filter?: Filter<Cod>
  ): Promise<Cod> {
    return this.codRepository.findById(id, filter);
  }

  @patch('/cod/{id}', {
    responses: {
      '204': {
        description: 'Cod PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cod, {partial: true}),
        },
      },
    })
    cod: Cod,
  ): Promise<void> {
    await this.codRepository.updateById(id, cod);
  }

  @patch('/cod-payment-received', {
    responses: {
      '204': {
        description: 'Cod PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async updateMultiple(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cod, {partial: true}),
        },
      },
    })
    cods: Cod[],
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    _.forEach(cods,function(cod) {
      return _this.codRepository.updateAll({"status": "payment_received"}, {"cod": cod.cod});
    });
  }

  @put('/cod/{id}', {
    responses: {
      '204': {
        description: 'Cod PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cod: Cod,
  ): Promise<void> {
    await this.codRepository.replaceById(id, cod);
  }

  @del('/cod/{id}', {
    responses: {
      '204': {
        description: 'Cod DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'cleo'],
    voters: [jwtAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.codRepository.deleteById(id);
  }
}
