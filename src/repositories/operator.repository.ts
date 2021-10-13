import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Operator, OperatorRelations, OperatorStep} from '../models';
import {PostgresDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OperatorStepRepository} from './operator-step.repository';

export class OperatorRepository extends DefaultCrudRepository<
  Operator,
  typeof Operator.prototype.id,
  OperatorRelations
> {

  public readonly operatorSteps: HasManyRepositoryFactory<OperatorStep, typeof Operator.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('OperatorStepRepository') protected operatorStepRepositoryGetter: Getter<OperatorStepRepository>,
  ) {
    super(Operator, dataSource);
    this.operatorSteps = this.createHasManyRepositoryFactoryFor('operatorSteps', operatorStepRepositoryGetter,);
    this.registerInclusionResolver('operatorSteps', this.operatorSteps.inclusionResolver);
  }
}
