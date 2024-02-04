import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaClient } from '@prisma/client';
import { Video, VideoType } from './entities/video.entity';

@Injectable()
export class VideoService {
  prisma = new PrismaClient();

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  // http:localhost:8080/video
  // get data từ database
  // Nest: async await
  // kết quả trả về: Promise<Video[]>
  // chờ đợi kết quả trả về là list video
  async getAllVideo(): Promise<Video[]> {
    let data = await this.prisma.video.findMany();

    return data;
  }

  async getAllVideoByAdmin(): Promise<Video[]> {
    let data = await this.prisma.video.findMany({
      include:{
        users:{
          select:{
            full_name:true
          }
        }
      }
    });
    return data;
  }

  async getAllVideoPage(
    page: number,
    typeId: number,
    num: number,
  ): Promise<Video[]> {
    if (!page) {
      page = 1;
    }
    let data = [];
    if (!typeId) {
      data = await this.prisma.video.findMany({
        skip: (page - 1) * num,
        take: num,
      });
      return data;
    } else if (typeId == 1) {
      data = await this.prisma.video.findMany({
        take: num,
        orderBy: {
          video_id: 'desc',
        },
      });
      return data;
    } else if (typeId > 1) {
      data = await this.prisma.video.findMany({
        where: {
          type_id: typeId,
        },
        skip: (page - 1) * num,
        take: num,
      });
      return data;
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllVideoByTypeId(typeId: number): Promise<Video[]> {
    let data = await this.prisma.video.findMany({
      where: {
        type_id: typeId,
      },
    });
    if (data) {
      return data;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async getAllVideoByUserId(userId: number): Promise<Video[]> {
    let data = await this.prisma.video.findMany({
      where: {
        user_id: userId,
      },
    });
    if (data) {
      return data;
    } else {
      throw new HttpException("Can't get video", HttpStatus.BAD_REQUEST);
    }
  }

  async getVideoByKeySearch(keySearch: string): Promise<Video[]> {
    let data = await this.prisma.video.findMany({
      where: {
        video_name: {
          contains: keySearch,
        },
      },
    });
    return data;
  }

  async getVideoDetail(id: number): Promise<Video> {
    let data = await this.prisma.video.findFirst({
      where: {
        video_id: id,
      },
    });
    return data;
  }

  async getVideoLatest(): Promise<Video[]> {
    let data = await this.prisma.video.findMany({
      take: 3,
      orderBy: {
        video_id: 'desc',
      },
    });
    return data;
  }

  async getAllVideoType(): Promise<VideoType[]> {
    let data = await this.prisma.video_type.findMany();
    return data;
  }

  async uploadInfVideo(id, file, body: CreateVideoDto): Promise<any> {
    let { video_name, description } = body;
    let dataVideo = await this.prisma.video.create({
      data: {
        video_name,
        description,
        thumbnail: `http://localhost:8080/${file.filename}`,
        views: 0,
        source: 'youtube.com',
        user_id: id,
        type_id: 1,
      },
    });
    if (dataVideo) {
      return dataVideo;
    } else {
      throw new HttpException('Some thing are wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async uploadVideo(id, file): Promise<any> {
    let checkVideo = await this.prisma.video.findFirst({
      orderBy: {
        video_id: 'desc',
      },
      where: {
        user_id: id,
      },
    });
    if (checkVideo) {
      let videoUpload = await this.prisma.video.update({
        where: {
          video_id: checkVideo.video_id,
        },
        data: {
          url: `http://localhost:8080/${file.filename}`,
        },
      });
      if (videoUpload) {
        return videoUpload;
      } else {
        throw new HttpException('Tạo video thất bại', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('update thất bại', HttpStatus.FORBIDDEN);
    }
  }
  async updateViews(id: number, numIncrease: number) {
    if (numIncrease >= 1) {
      let video = await this.prisma.video.findFirst({
        where: {
          video_id: id,
        },
      });
      if (video) {
        await this.prisma.video.update({
          where: { video_id: id },
          data: {
            views: video.views + numIncrease,
          },
        });
        return "OK";
      } else {
        throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(
        'Number Increase is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

 async remove(id: number) {
    let checkVideo=await this.prisma.video.findFirst({
      where:{
        video_id:id
      }
    });
    if(!checkVideo){
    throw new HttpException("Video not found",HttpStatus.NOT_FOUND);
    }
    await this.prisma.video.delete({
      where:{
        video_id:id
      }
    })
    return "Ok";
  }
}
