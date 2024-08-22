import { Model } from 'objection';
import { Brand } from '../brand/brand.model';

export class Meal extends Model {
  static get tableName() {
    return 'meals';
  }

  id!: number;

  name!: string;

  price!: number;

  brandId?: number;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        price: { type: 'number' },
        brandId: { type: 'integer', nullable: true },
      },
    };
  }

  // relationships with other models
  static get relationMappings() {
    return {
      brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'meals.brandId',
          to: 'brands.id',
        },
      },
    };
  }
}
