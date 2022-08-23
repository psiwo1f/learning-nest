import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
    private users = [
        {email: 't1@em.com'},
        {email: 't2@em.com'},
        {email: 't3@em.com'},
    ]
    createPayment(dto: CreatePaymentDto) {
        const {email} = dto
        const user = this.users.find(e => e.email===email)
        if(user) {
            return {status: 'success'}
        } else {
            throw new BadRequestException()
        }
    }
}
