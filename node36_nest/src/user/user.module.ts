import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports:[JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
})
export class UserModule {}
