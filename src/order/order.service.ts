import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Order } from './order.model';
import { OrdersGateway } from '../app.gateway';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderLog } from '../order-log/order-log.model';
import { ErrorHelper } from '../libs/utils';

@Injectable()
export class OrderService {
  constructor(
    @Inject('KnexConnection') private knex: Knex,
    private readonly ordersGateway: OrdersGateway
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = await Order.query().insert(dto);
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

  async updateOrder(id: string, dto: UpdateOrderDto): Promise<Order> {
    const order = await Order.query().patchAndFetchById(id, dto);
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

  async processOrder(orderId: string): Promise<void> {
    const order = await this.getOrderById(orderId);
    if (!order) {
      ErrorHelper.NotFoundException(`Order not found`);
    }

    if (order.status === 'completed' || order.status === 'cancelled') {
      ErrorHelper.NotFoundException(`Order cannot be processed`);
    }

    const statusSequence = ['accepted', 'prepared', 'dispatched', 'delivered'];
    // eslint-disable-next-line no-restricted-syntax
    for (const status of statusSequence) {
      await Order.query().patchAndFetchById(orderId, { status });

      await OrderLog.query().insert({ orderId, status, timestamp: new Date().toISOString() });

      this.ordersGateway.broadcastOrderUpdate(orderId, status);
    }

    const totalPrice =
      order.meal.price * order.quantity + (order.addon ? order.addon.price * order.quantity : 0);

    await this.knex('calculated_orders').insert({
      orderId,
      totalPrice,
      calculationDate: new Date().toISOString(),
    });

    this.ordersGateway.broadcastOrderUpdate(orderId, 'completed');
  }
}
