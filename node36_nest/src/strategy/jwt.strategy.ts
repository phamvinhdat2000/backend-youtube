import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
type JwtPayload={
user_id:number
full_name:string,
email:string,
role:string
}
@Injectable()
export class JwtStrategy extends
    PassportStrategy(Strategy,"jwt") {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("SECRET_KEY"),
        });
    }
    prisma = new PrismaClient();

    async validate(payload: JwtPayload) {
    return payload;
     }
}

