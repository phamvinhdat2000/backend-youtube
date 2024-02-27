import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('NodeJS36')
    .addBearerAuth()
    .setDescription('Đây là Swagger demo NestJS')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);
  app.useStaticAssets(join(__dirname, '..', 'public/img'));
  app.useStaticAssets(join(__dirname, '..', 'public/video'));
  await app.listen(8080);
}
bootstrap();
