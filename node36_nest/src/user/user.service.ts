import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async getUserById(id: number) {
    try {
      if (!id) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      let user = await this.prisma.users.findFirst({
        where: {
          user_id: id,
        },
      });
      if (user) {
        return user;
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByToken(accessToken: string): Promise<any> {
    try {
      let data = await this.jwtService.decode(accessToken);
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id, file, body: UpdateUserDto): Promise<any> {
    try {
      let { full_name, email } = body;
      let checkEmail = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });
      if (checkEmail && checkEmail.user_id != id) {
        throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      }
      if (file) {
        await this.prisma.users.update({
          where: {
            user_id: id,
          },
          data: {
            avatar: `http://103.82.135.231:8080/${file.filename}`,
            email,
            full_name,
          },
        });
      } else {
        await this.prisma.users.update({
          where: {
            user_id: id,
          },
          data: {
            email,
            full_name,
          },
        });
      }

      let data = await this.prisma.users.findFirst({
        where: {
          user_id: id,
        },
      });
      return data;
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
