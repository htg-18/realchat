import { Injectable } from '@nestjs/common';
import { responses } from './responses';

@Injectable()
export class AppService {
  getHello(st: string): string {
    return `Hi ${st}`;
  }

  getResponse(keyword: string): string {
    //convert to lower case to make the inputs case insensitive
    const lowercaseKeyword = keyword.toLowerCase();
    //searching in the responses file if there is a keyword in the input 
    const matchedKeys = Object.keys(responses).filter(
      (key) => lowercaseKeyword.includes(key)
    );
    //If not found return a default string
    //else we return the concatenation of the values as the keys present
    const finalResponse =
      matchedKeys.length > 0
        ? matchedKeys.map((key) => responses[key]).join(' ')
        : 'Sorry, I could not understand that';

    return finalResponse;
  }
}

