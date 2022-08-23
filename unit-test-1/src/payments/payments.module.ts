import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [{
    provide: 'PAYMENTS_SERVICE',
    useClass: PaymentsService
  }]
})
export class PaymentsModule {}
