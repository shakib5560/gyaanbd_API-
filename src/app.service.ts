import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      port: "200",
      host: "localhost",
      message: "Hello World!",
    };
  }
}