import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello node36';
  }

  getVideo(): string {
    return "get video";
  }

}
