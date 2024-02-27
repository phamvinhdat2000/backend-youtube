import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiParam, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';

export class userType {
  @ApiProperty({ description: 'ho ten', type: String })
  hoTen: string;

  @ApiProperty({ description: 'email', type: String })
  email: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/get-video')
  getVideo() {
    return this.appService.getVideo();
  }

  @ApiParam({ name: 'email' })
  @ApiBody({ type: userType })
  @ApiQuery({ name: 'id' })
  @ApiQuery({ name: 'fullName' })
  @Post('/create-video/:email')
  createVideo(): any {
    return this.configService.get('NODE_NEST');
  }
}
