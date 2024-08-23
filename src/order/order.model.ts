import { Model } from 'objection';

export class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  id!: string;

  customerId!: string;

  mealId!: string;

  addonId?: string;

  quantity!: number;

  status?: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['customerId', 'mealId', 'quantity'],

      properties: {
        id: { type: 'string' },
        customerId: { type: 'string' },
        mealId: { type: 'string' },
        addonId: { type: 'string', nullable: true },
        quantity: { type: 'integer' },
        status: { type: 'string', nullable: true },
      },
    };
  }
}
