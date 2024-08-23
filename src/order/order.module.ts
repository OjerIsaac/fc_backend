import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrdersGateway } from '../app.gateway';

@Module({
  imports: [ObjectionModule.forFeature([Order])],
  providers: [OrderService, OrdersGateway],
  controllers: [OrderController],
})
export class OrderModule {}
