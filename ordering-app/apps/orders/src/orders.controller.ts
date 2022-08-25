import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('hi')
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() dto: CreateOrderDto, @Req() req: any) {
    return this.ordersService.createOrder(dto, req.cookies?.Authentication)
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders()
  }
}
