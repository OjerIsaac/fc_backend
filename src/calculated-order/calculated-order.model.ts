import { Model } from 'objection';
import { Order } from '../order/order.model';

export class CalculatedOrder extends Model {
  static get tableName() {
    return 'calculated_orders';
  }

  id!: number;

  orderId!: number;

  totalPrice!: number;

  calculationDate!: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['orderId', 'totalPrice', 'calculationDate'],

      properties: {
        id: { type: 'integer' },
        orderId: { type: 'integer' },
        totalPrice: { type: 'number' },
        calculationDate: { type: 'string', format: 'date-time' },
      },
    };
  }

  // relationships with other models
  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'calculated_orders.orderId',
          to: 'orders.id',
        },
      },
    };
  }
}
