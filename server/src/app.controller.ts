import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { responses } from './responses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(st: string): string {
    return this.appService.getHello('Hello');
  }

  @Get('bye')
  getBye(st: string): string {
    return this.appService.getBye('Bye');
  }

  @Post('response')
  getResponse(@Body('keyword') keyword: string, @Res() res): void {
    // Convert keyword to lowercase for case-insensitive comparison
    const lowercaseKeyword = keyword.toLowerCase();
    console.log(lowercaseKeyword)
    // Check if the lowercase keyword is present in the lowercase keys of responses
    const matchedKeys = Object.keys(responses).filter(
      (key) => lowercaseKeyword.includes(key)
    );
     console.log(matchedKeys)
    // Build the final response string based on matched keys
    const finalResponse =
      matchedKeys.length > 0
        ? matchedKeys.map((key) => responses[key]).join(' ')
        : 'Sorry, I could not understand that';

    // Send the response as JSON
    res.json({ response: finalResponse });
  }
}
