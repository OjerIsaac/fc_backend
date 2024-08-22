import { Model } from 'objection';

export class Brand extends Model {
  static get tableName() {
    return 'brands';
  }

  id!: string;

  name!: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
      },
    };
  }
}
