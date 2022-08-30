import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Sub1Service } from './sub1.service';

@Controller()
export class Sub1Controller {
  constructor(private readonly sub1Service: Sub1Service) {}

  @Get()
  getHello(): string {
    return this.sub1Service.getHello();
  }

  @MessagePattern({cmd: 'pat'})
  getPatternSub(): string {
    return 'Hello from Pattern'
  }
}
