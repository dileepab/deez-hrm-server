import {Entity, model, property, hasMany} from '@loopback/repository';
import {Step} from './step.model';

@model()
export class Design extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  brand?: string;

  @property({
    type: 'number',
  })
  quantity?: number;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'is_complete'
    }
  })
  isComplete?: boolean;

  @property({
    type: 'Date',
    postgresql: {
      columnName: 'start_time'
    }
  })
  startTime?: Date;

  @property({
    type: 'number',
  })
  sewingValue?: number;

  @property({
    type: 'number', //1- sawing, 2- helper
  })
  type?: number;

  @hasMany(() => Step)
  steps: Step[];

  constructor(data?: Partial<Design>) {
    super(data);
  }
}

export interface DesignRelations {
  // describe navigational properties here
}

export type DesignWithRelations = Design & DesignRelations;
