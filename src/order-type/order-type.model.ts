import { Model } from 'objection';

export class OrderType extends Model {
  static get tableName() {
    return 'order_types';
  }

  id!: number;

  type!: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],

      properties: {
        id: { type: 'integer' },
        type: { type: 'string' },
      },
    };
  }
}
