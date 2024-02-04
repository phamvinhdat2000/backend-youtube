import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    private jwtService:JwtService
  ){}
  prisma = new PrismaClient();
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

 async getUserById(id: number) {
    if(!id){
      throw new HttpException("User not found",HttpStatus.BAD_REQUEST)
    }
   let user=await this.prisma.users.findFirst({
    where:{
      user_id:id
    }
   });
   if(user){
    return user;
   }else{
    throw new HttpException("User not found",HttpStatus.NOT_FOUND)
   }
  }

 async getUserByToken(accessToken:string): Promise<any>{
 
  let data=await this.jwtService.decode(accessToken) ;
    if(!data){
      throw new HttpException("Some thing wrong",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return data;
  }

 async update(id,file,body:UpdateUserDto):Promise<any> {
  let {full_name,email}=body;
  let checkEmail=await this.prisma.users.findFirst({
    where:{
      email,
    }
  });
  if(checkEmail && checkEmail.user_id!=id){
    throw new HttpException("Email đã tồn tại",HttpStatus.BAD_REQUEST);
  }
  if(file){
    await this.prisma.users.update({
      where: {
        user_id: id,
      },
      data: {
        avatar:`http://localhost:8080/${file.filename}`,
        email,
        full_name
      },
    })
  }else{
    await this.prisma.users.update({
      where: {
        user_id: id,
      },
      data: {
        email,
        full_name
      },
    })
  }
   
    let data= await this.prisma.users.findFirst({
      where:{
        user_id:id
      }
    })
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
