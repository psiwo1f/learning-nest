import { Test, TestingModule } from '@nestjs/testing';
import { Sub1Controller } from './sub1.controller';
import { Sub1Service } from './sub1.service';

describe('Sub1Controller', () => {
  let sub1Controller: Sub1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Sub1Controller],
      providers: [Sub1Service],
    }).compile();

    sub1Controller = app.get<Sub1Controller>(Sub1Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sub1Controller.getHello()).toBe('Hello World!');
    });
  });
});
