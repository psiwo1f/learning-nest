import { Module } from '@nestjs/common';
import { Sub1Controller } from './sub1.controller';
import { Sub1Service } from './sub1.service';

@Module({
  imports: [],
  controllers: [Sub1Controller],
  providers: [Sub1Service],
})
export class Sub1Module {}
