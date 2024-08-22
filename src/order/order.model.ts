import { Model } from 'objection';
import { Meal } from '../meal/meal.model';
import { Addon } from '../addon/addon.model';

export class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  id!: number;

  customerId!: number;

  mealId!: number;

  addonId?: number;

  quantity!: number;

  status!: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['customerId', 'mealId', 'quantity', 'status'],

      properties: {
        id: { type: 'integer' },
        customerId: { type: 'integer' },
        mealId: { type: 'integer' },
        addonId: { type: 'integer', nullable: true },
        quantity: { type: 'integer' },
        status: { type: 'string' },
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
          from: 'orders.mealId',
          to: 'meals.id',
        },
      },
      addon: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addon,
        join: {
          from: 'orders.addonId',
          to: 'addons.id',
        },
      },
    };
  }
}
