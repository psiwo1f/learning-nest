import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createOrder(dto: CreateOrderDto, authentication: string) {
    // return this.orderRepository.create(dto)
    const session = await this.orderRepository.startTransaction();
    try {
      const order = this.orderRepository.create(dto, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          dto,
          Authentication: authentication,
        }),
      );
      session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  getOrders() {
    return this.orderRepository.find({});
  }
}
