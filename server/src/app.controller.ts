import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(st: string): string {
    return this.appService.getHello('Hello');
  }
  //writing a post request on /response route to get the reply from the chatbot
  @Post('response')
  getResponse(@Body('keyword') keyword: string, @Res() res): void {
    //calling the getResponse method from the appService
    const finalResponse = this.appService.getResponse(keyword);
    //the frontend expects the response in this format
    res.json({ response: finalResponse });
  }
}
