import { Controller, Get,Post,Body,Res } from '@nestjs/common';
import { AppService } from './app.service';
import { responses } from './responses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(st:string): string {
    return this.appService.getHello("Hello");
  }
  @Get('bye')
  getBye(st:string): string {
    return this.appService.getBye("Bye");
  }
  @Post('response')
  getResponse(@Body('keyword') keyword: string, @Res() res): void {
    if (responses[keyword]) {
      res.json({ response: responses[keyword] });
    } else {
      res.json({ response: 'Sorry I could not understand that' });
    }
  }

}
