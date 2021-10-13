import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    indexes: {
      uniqueCod: {
        keys: {
          cod: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Cod extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  cod?: number;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'string',
  })
  customer_name?: string;

  @property({
    type: 'string',
  })
  customer_address?: string;

  @property({
    type: 'string',
  })
  phone_no?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  weight?: number;

  @property({
    type: 'Date',
  })
  date?: Date;


  constructor(data?: Partial<Cod>) {
    super(data);
  }
}

export interface CodRelations {
  // describe navigational properties here
}

export type CodWithRelations = Cod & CodRelations;
