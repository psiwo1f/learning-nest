import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  createOrder(dto: CreateOrderDto) {
    return this.orderRepository.create(dto)
  }

  getOrders() {
    return this.orderRepository.find({})
  }
}
