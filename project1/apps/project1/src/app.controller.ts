import { Controller, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly client: ClientProxy ) {}
  // constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // execute(): Observable<number> {
  //   const pattern = { cmd: 'sum' };
  //   const data = [1, 2, 3];
  //   return this.client.send<number>(pattern, data);
  // }

  @Get('pat')
  helloPat(): Observable<string> {
    const pattern = {cmd: 'pat'}
    const data = []
    return this.client.send<string>(pattern, data)
  }

  // @Get(':name')
  // helloNamed(@Param('name') name: string): string {
  //   return this.appService.helloNamed(name)
  // }
  
  
}
