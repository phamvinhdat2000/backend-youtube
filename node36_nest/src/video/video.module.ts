import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RfJwtStrategy } from 'src/strategy/refreshtoken.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
