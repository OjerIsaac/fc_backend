import { Model } from 'objection';
import { Meal } from '../meal/meal.model';

export class Addon extends Model {
  static get tableName() {
    return 'addons';
  }

  id!: string;

  name!: string;

  price!: number;

  mealId?: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        mealId: { type: 'string', nullable: true },
      },
    };
  }

  // relationships with other models
  static get relationMappings() {
    return {
      meal: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meal,
        join: {
          from: 'addons.mealId',
          to: 'meals.id',
        },
      },
    };
  }
}
