import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpResponse, ErrorHelper } from '../libs/utils';
import { validateUUID } from '../libs/helpers';
import { AuthGuard, RoleGuard } from '../guards';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const data = await this.orderService.createOrder(dto);

    return HttpResponse.success({
      data,
      message: 'Order added successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.orderService.getOrderById(id);

    return HttpResponse.success({
      data,
      message: 'Order fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    const data = await this.orderService.updateOrder(id, dto);

    return HttpResponse.success({
      data,
      message: 'Order updated successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    if (!validateUUID(id)) {
      ErrorHelper.BadRequestException('Invalid ID');
    }

    await this.orderService.deleteOrder(id);

    return HttpResponse.success({
      message: 'Order deleted successfully',
      statusCode: HttpStatus.OK,
    });
  }

  @Get()
  async getAllOrders(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    const data = await this.orderService.getAllOrders(page, pageSize);

    return HttpResponse.success({
      data,
      message: 'Order fetched successfully',
      statusCode: HttpStatus.OK,
    });
  }
}
