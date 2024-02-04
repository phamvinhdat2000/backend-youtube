import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();
 async createComment(createCommentDto: CreateCommentDto) {
    const {content,video_id,user_id,date_create}=createCommentDto;
    let data=await this.prisma.video_comment.create({
      data:{
        content,
        video_id:+video_id,
        user_id,
        date_create:new Date()
      }
    })
    if(!data){
      throw new HttpException("Not create",HttpStatus.CONFLICT)
    }
    return data
  }

  async getAllComment(videoId:number):Promise<any[]> {
    let data=await this.prisma.video_comment.findMany({
      where:{
        video_id:videoId
      },
      include:{
        users:true
      }
    });
    if(!data){
      throw new HttpException("comment not found",HttpStatus.NOT_FOUND);
    }
    return data;
}

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
