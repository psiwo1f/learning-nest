import { Injectable } from '@nestjs/common';

@Injectable()
export class Sub1Service {
  getHello(): string {
    return 'Hello World!';
  }
}
