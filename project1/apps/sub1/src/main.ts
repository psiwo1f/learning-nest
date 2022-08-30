import { NestFactory } from '@nestjs/core';
import { Sub1Module } from './sub1.module';

async function bootstrap() {
  const app = await NestFactory.create(Sub1Module);
  await app.listen(3000);
}
bootstrap();
