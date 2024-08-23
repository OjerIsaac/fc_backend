import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Order } from './order.model';
import { OrdersGateway } from '../app.gateway';

@Injectable()
export class OrderService {
  constructor(
    @Inject('KnexConnection') private knex: Knex,
    private readonly ordersGateway: OrdersGateway
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const order = await Order.query().insert(orderData);
    this.ordersGateway.broadcastOrderUpdate(order.id, 'created');
    return order;
  }

  async getOrderById(orderId: string) {
    const order = await this.knex('orders')
      .select(
        'orders.id as orderId',
        'orders.customerId',
        'orders.quantity',
        'meals.id as mealId',
        'meals.name as mealName',
        'addons.id as addonId',
        'addons.name as addonName'
      )
      .leftJoin('meals', 'orders.mealId', 'meals.id')
      .leftJoin('addons', 'orders.addonId', 'addons.id')
      .where('orders.id', orderId)
      .first();

    if (!order) {
      return null;
    }

    return {
      orderId: order.orderId,
      customerId: order.customerId,
      quantity: order.quantity,
      meal: {
        id: order.mealId,
        name: order.mealName,
        price: order.mealPrice,
      },
      addon: order.addonId
        ? {
            id: order.addonId,
            name: order.addonName,
            price: order.addonPrice,
          }
        : null, // If no addon is associated, return null
    };
  }

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    const order = await Order.query().patchAndFetchById(id, orderData);
    this.ordersGateway.broadcastOrderUpdate(id, 'updated');
    return order;
  }

  async deleteOrder(id: string): Promise<void> {
    await Order.query().deleteById(id);
    this.ordersGateway.broadcastOrderUpdate(id, 'deleted');
  }

  async getAllOrders(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;

    const orders = await this.knex('orders')
      .select(
        'orders.id as orderId',
        'orders.customerId',
        'orders.quantity',
        'meals.id as mealId',
        'meals.name as mealName',
        'addons.id as addonId',
        'addons.name as addonName'
      )
      .leftJoin('meals', 'orders.mealId', 'meals.id')
      .leftJoin('addons', 'orders.addonId', 'addons.id')
      .limit(pageSize)
      .offset(offset);

    return orders.map(order => ({
      orderId: order.orderId,
      customerId: order.customerId,
      quantity: order.quantity,
      meal: {
        id: order.mealId,
        name: order.mealName,
        price: order.mealPrice,
      },
      addon: order.addonId
        ? {
            id: order.addonId,
            name: order.addonName,
            price: order.addonPrice,
          }
        : null, // If no addon is associated, return null
    }));
  }
}
