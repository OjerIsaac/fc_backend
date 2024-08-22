import { Model } from 'objection';
import { Order } from '../order/order.model';

export class OrderLog extends Model {
  static get tableName() {
    return 'order_logs';
  }

  id!: number;

  orderId!: number;

  status!: string;

  timestamp!: string;

  // JSON schema for the model
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['orderId', 'status', 'timestamp'],

      properties: {
        id: { type: 'integer' },
        orderId: { type: 'integer' },
        status: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' },
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
