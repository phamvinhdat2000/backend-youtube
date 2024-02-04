import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // enable cors (bypass các request từ front-end)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*"
  });
 
  // tạo đối tượng swagger
  const config = new DocumentBuilder()
  .setTitle("NodeJS36")
  .addBearerAuth() // define authenticate
  .setDescription("Đây là Swagger demo NestJS")
  .setVersion("v1")
  .build()

  // kết nối các API NestJS vs Swagger
  const document = SwaggerModule.createDocument(app, config);

  // build layout swagger
  SwaggerModule.setup("/swagger", app, document);
  app.useStaticAssets(join(__dirname,'..','public/img'));
  app.useStaticAssets(join(__dirname,'..','public/video'));
  await app.listen(8080);
}
bootstrap();

// yarn run start => node main.ts
// app module: map các module lại với nhau
// user, video, comment,.....

// B1: cài prisma
// yarn add prisma @prisma/client
// npm i prisma @prisma/client
// B2: yarn prisma init ----npx prisma init
// B3: update connection string
// B4: yarn prisma db pull --- npx prisma db pull

// DTO, entities
// DTO: kiểu dữ liệu dùng cho controller

// entities: kiểu dữ liệu define cho service
// vì sao
// entities: sẽ có nhiều data - data cho controller, data khác (ko cần thiết)
// entities -> DTO : lấy những data cần thiết, để tránh rò rỉ data 
// nhạy cảm (password, face_app_id, SDT,...)

// yarn add @nestjs/config @nestjs/passport passport passport-local  @nestjs/jwt passport-jwt @types/passport-jwt
