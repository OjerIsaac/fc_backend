import { Model } from 'objection';
import { Order } from '../order/order.model';

export class OrderLog extends Model {
  static get tableName() {
    return 'order_logs';
  }

  id!: number;

  orderId!: number;

  status!: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['orderId', 'status'],

      properties: {
        id: { type: 'integer' },
        orderId: { type: 'integer' },
        status: { type: 'string' },
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
          from: 'order_logs.orderId',
          to: 'orders.id',
        },
      },
    };
  }
}
