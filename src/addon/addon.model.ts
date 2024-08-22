import { Model } from 'objection';

export class Addon extends Model {
  static get tableName() {
    return 'addons';
  }

  id!: number;

  name!: string;

  price!: number;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        price: { type: 'number' },
      },
    };
  }
}
