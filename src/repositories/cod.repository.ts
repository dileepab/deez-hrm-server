import {DefaultCrudRepository} from '@loopback/repository';
import {Cod, CodRelations} from '../models';
import {PostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CodRepository extends DefaultCrudRepository<
  Cod,
  typeof Cod.prototype.id,
  CodRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Cod, dataSource);
  }
}
