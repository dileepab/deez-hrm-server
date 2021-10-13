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
import {Design} from '../models';
import {DesignRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {jwtAuthorization} from '../services/jwt.authorizor';

export class DesignController {
  constructor(
    @repository(DesignRepository)
    public designRepository : DesignRepository,
  ) {}

  @post('/designs', {
    responses: {
      '200': {
        description: 'Design model instance',
        content: {'application/json': {schema: getModelSchemaRef(Design)}},
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
          schema: getModelSchemaRef(Design, {
            title: 'NewDesign',
            exclude: ['id'],
          }),
        },
      },
    })
    design: Omit<Design, 'id'>,
  ): Promise<Design> {
    return this.designRepository.create(design);
  }

  @get('/designs', {
    responses: {
      '200': {
        description: 'Array of Design model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Design, {includeRelations: true}),
            },
          },
        },
      },
    },
  })

  async find(
    @param.query.object('filter', getFilterSchemaFor(Design)) filter?: Filter<Design>,
  ): Promise<Design[]> {
    return this.designRepository.find(filter);
  }

  @patch('/designs', {
    responses: {
      '200': {
        description: 'Design PATCH success count',
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
          schema: getModelSchemaRef(Design, {partial: true}),
        },
      },
    })
    design: Design,
    @param.query.object('where', getWhereSchemaFor(Design)) where?: Where<Design>,
  ): Promise<Count> {
    return this.designRepository.updateAll(design, where);
  }

  @get('/designs/{id}', {
    responses: {
      '200': {
        description: 'Design model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Design, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Design)) filter?: Filter<Design>
  ): Promise<Design> {
    return this.designRepository.findById(id, filter);
  }

  @patch('/designs/{id}', {
    responses: {
      '204': {
        description: 'Design PATCH success',
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
          schema: getModelSchemaRef(Design, {partial: true}),
        },
      },
    })
    design: Design,
  ): Promise<void> {
    await this.designRepository.updateById(id, design);
  }

  @put('/designs/{id}', {
    responses: {
      '204': {
        description: 'Design PUT success',
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
    @requestBody() design: Design,
  ): Promise<void> {
    await this.designRepository.replaceById(id, design);
  }

  @del('/designs/{id}', {
    responses: {
      '204': {
        description: 'Design DELETE success',
      },
    },
  })

  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'manager'],
    voters: [jwtAuthorization],
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.designRepository.deleteById(id);
  }
}
