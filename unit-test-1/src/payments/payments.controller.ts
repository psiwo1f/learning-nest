import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Get()
  allPayments(@Req() req: Request, @Res() res: Response) {
    const { count, page } = req.query;
    if (!(count || page)) {
      res.status(400).send({ msg: 'Query params missing' });
    } else {
      res.send(200);
    }
  }
}
