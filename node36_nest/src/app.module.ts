import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';



// muốn dùng thư viện nào, module custom thì
// import module đó vào app module (tổng)
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), VideoModule, UserModule, AuthModule, CommentModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// express
// routes, controller, model

// nest
// module, controller, service
// module: map các module lại vs nhau và map với các module

// controller <--> routes: định nghĩa các API
// service <---> controller (express): nơi xử lý logic, 
// lấy data từ database
