import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentService: PaymentsService

  const reqMock = {
    query: {},
  } as unknown as Request

  const statusResMock = {
    send: jest.fn(x => x)
  }
  const respMock = {
    status: jest.fn(x => statusResMock),
    send: jest.fn(x => x)
  } as unknown as Response
  // const respMock = {
  //   status: jest.fn(x => ({
  //     send: jest.fn(y => y)
  //   })),
  //   send: jest.fn(x => x)
  // } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn(x => x)
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>('PAYMENTS_SERVICE')
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('payment service should be defined', () => {
    expect(paymentService).toBeDefined();
  })

  describe('allpayments', () => {
    it('should return 400 status without query params', () => {
      controller.allPayments(reqMock, respMock)
      expect(respMock.status).toHaveBeenCalledWith(400)
      expect(statusResMock.send).toHaveBeenCalledWith({msg: 'Query params missing'})
    })
    it('should return 200 status with query params', () => {
      reqMock.query = {
        count: '20',
        page: '1'
      }
      controller.allPayments(reqMock, respMock)
      expect(respMock.send).toHaveBeenCalledWith(200)
    })
  })

  describe('createPayment', () => {
    // it('should create payment', async () => {
    //   const resp = await controller.createPayment({email: 't1@em.com', price: 40})
    //   expect(resp).toStrictEqual({status: 'success'})
    // })

    // below is useless test, not doing anything meaningful
    it('should throw an error', () => {
      jest.spyOn(paymentService, 'createPayment').mockImplementationOnce(() => {
        throw new BadRequestException()
      })
    })
  })

});
