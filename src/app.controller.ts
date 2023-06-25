import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //readonly es un tpo de dato solo de lectura en el constrcutor estamos haciendo una injeccion de dependenias

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('products')
  getAll(): string[] {
    return this.appService.getAll();
  }
}
