import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RfJwtStrategy } from 'src/strategy/refreshtoken.strategy';

@Module({
  imports:[JwtModule.register({})],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
