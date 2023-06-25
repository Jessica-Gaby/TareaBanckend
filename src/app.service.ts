import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Class Web Aplication Programm 2023';
  }

  getAll(): string[] {
    return ['zapatos', 'zapatos deportivos'];
  }
}
