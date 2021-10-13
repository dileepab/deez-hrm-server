import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Step, StepRelations, Design, OperatorStep} from '../models';
import {PostgresDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DesignRepository} from './design.repository';
import {OperatorStepRepository} from './operator-step.repository';

export class StepRepository extends DefaultCrudRepository<
  Step,
  typeof Step.prototype.id,
  StepRelations
> {

  public readonly design: BelongsToAccessor<Design, typeof Step.prototype.id>;

  public readonly operatorSteps: HasManyRepositoryFactory<OperatorStep, typeof Step.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('DesignRepository') protected designRepositoryGetter: Getter<DesignRepository>, @repository.getter('OperatorStepRepository') protected operatorStepRepositoryGetter: Getter<OperatorStepRepository>,
  ) {
    super(Step, dataSource);
    this.operatorSteps = this.createHasManyRepositoryFactoryFor('operatorSteps', operatorStepRepositoryGetter,);
    this.registerInclusionResolver('operatorSteps', this.operatorSteps.inclusionResolver);
    this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter,);
    this.registerInclusionResolver('design', this.design.inclusionResolver);
  }
}
