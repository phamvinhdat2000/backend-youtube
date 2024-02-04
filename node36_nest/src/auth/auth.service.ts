import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginDTO } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { registerUserDTO } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, // lib giúp mình tạo token,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async login(body: loginDTO): Promise<any> {
    // kiểm tra email
    let { email, pass_word } = body;
    let checkEmail = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      // kiểm tra password
      let checkPass = await bcrypt.compareSync(pass_word, checkEmail.pass_word);
      if (checkPass) {
        // tạo token
        let tokens = await this.getTokens(
          checkEmail.user_id,
          checkEmail.full_name,
          checkEmail.email,
          checkEmail.role
        );
        await this.updateRefreshToken(checkEmail.user_id, tokens.refreshToken);
        return tokens;
      } else {
        throw new HttpException('Password sai', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Email không hợp lệ', HttpStatus.BAD_REQUEST);
    }
  }

  // về nhà làm
  async register(body: registerUserDTO): Promise<any> {
    let { email, pass_word, full_name } = body;
    let user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    } else {
      let hashPassword = bcrypt.hashSync(pass_word, 10);
      let newDataUser = {
        email,
        pass_word: hashPassword,
        full_name,
      };
      let newUser = await this.prisma.users.create({ data: newDataUser });
      if(newUser){
        throw new HttpException("Ok",HttpStatus.CREATED)
      }else{
        throw new HttpException("Something wrong",HttpStatus.EXPECTATION_FAILED)
      }
    }
  }

  async logout(userId: number) {
    await this.prisma.users.update({
      where: {
        user_id: userId,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async refreshTokens( rt: string):Promise<any>{
    let verify= await this.jwtService.verifyAsync(rt,{
      secret:this.configService.get("REFRESH_SECRET_KEY")
    });
    let checkExistToken=await this.prisma.users.findFirst({
      where:{
        email:verify.email,
        refresh_token:rt
      }
    });
    if(checkExistToken){
      let tokens=await this.getTokens(verify.user_id,verify.full_name,verify.email,verify.role);
      await this.updateRefreshToken(verify.user_id,tokens.refreshToken);
      return tokens;
    }else{
      throw new HttpException("access denied",HttpStatus.FORBIDDEN);
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
  }

  async loginByFb(body: any): Promise<any> {
    let { email, name, id } = body;
    let user = await this.prisma.users.findFirst({
      where: {
        face_app_id: id,
      },
    });
    if (!user) {
      let checkEmail = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });
      if (checkEmail) {
        let data = {
          full_name: name,
          email: `test${new Date().getTime()}@gmail.com`,
          face_app_id: id,
        };
        await this.prisma.users.create({ data: data });
      } else {
        let data = {
          full_name: name,
          email,
          face_app_id: id,
        };
        await this.prisma.users.create({ data: data });
      }
    }
    let infoUser = await this.prisma.users.findFirst({
      where: {
        face_app_id: id,
      },
    });
    let token = this.jwtService.sign(
      { data: infoUser },
      {
        expiresIn: this.configService.get('EXPIRE_IN'),
        secret: this.configService.get('SECRET_KEY'),
      },
    );
    if (token) {
      return token;
    } else {
      throw new HttpException('Lỗi', HttpStatus.BAD_REQUEST);
    }
  }

  async getTokens(user_id: number, full_name: string, email: string,role:string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          user_id: user_id,
          full_name: full_name,
          email: email,
          role:role
        },
        {
          secret: this.configService.get('SECRET_KEY'),
          expiresIn: this.configService.get('EXPIRE_IN'),
        },
      ),
      this.jwtService.signAsync(
        {
          user_id:user_id,
          full_name:full_name,
          email:email,
          role:role
        },
        {
          secret: this.configService.get('REFRESH_SECRET_KEY'),
          expiresIn: this.configService.get('RF_EXPIRE_IN'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken
    };
  }
}
