import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        @Inject('PAYMENTS_SERVICE')
        private readonly paymentService: PaymentsService
    ) {}

  @Get()
  allPayments(@Req() req: Request, @Res() res: Response) {
    const { count, page } = req.query;
    if (!(count || page)) {
      res.status(400).send({ msg: 'Query params missing' });
    } else {
      res.send(200);
    }
  }

  @Post('create')
  async createPayment(@Body() dto: CreatePaymentDto) {
    const resp = await this.paymentService.createPayment(dto)
    return resp
  }
}
