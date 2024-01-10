import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(st:string): string {
    return `Hi ${st}`;
  }
  getBye(st:string): string {
    return `Bye ${st}`;
  }
}
