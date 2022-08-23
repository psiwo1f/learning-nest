import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;
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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

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
});
