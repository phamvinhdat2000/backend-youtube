import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client'
import { Request } from 'express';
type RefJwtPayload={
    user_id:number,
    full_name:string,
    email:string,
    role:string
}
@Injectable()
export class RfJwtStrategy extends
    PassportStrategy(Strategy,"rf-jwt") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("REFRESH_SECRET_KEY"),
            passReqToCallback: true
        });
    }
    prisma = new PrismaClient();

    async validate(req:Request,payload:RefJwtPayload) {
      const refreshToken=req.get("Authorization").replace('Bearer','').trim();
      return {...payload,refreshToken};
    }
}

