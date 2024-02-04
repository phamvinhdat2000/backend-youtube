import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MessageService {
  prisma = new PrismaClient();

  async createMessage(createMessageDto: CreateMessageDto) {
    const { room_id, content, role } = createMessageDto;
    let dataRoom = await this.prisma.messages.groupBy({
      by: ['room_id'],
    });
    if (dataRoom[0]?.room_id == room_id || dataRoom.length == 0) {
      let mess = await this.prisma.messages.create({
        data: {
          room_id,
          content,
          role,
          create_at: new Date(),
        },
      });
      if (!mess) {
        throw new HttpException(
          'Can not create message',
          HttpStatus.BAD_REQUEST,
        );
      }
      return mess;
    }
    throw new HttpException('Can not create message', HttpStatus.BAD_REQUEST);
  }

  async getAllMessageByUser(room_id) {
    let dataMess = await this.prisma.messages.findMany({
      where: {
        room_id,
      },
    });
    if (!dataMess) {
      throw new HttpException('Not found data', HttpStatus.NOT_FOUND);
    }
    return dataMess;
  }

  async getAllMessageByAdmin() {
    let dataRoom = await this.prisma.messages.groupBy({
      by: ['room_id'],
    });
    if (!dataRoom) {
      throw new HttpException('Not found data', HttpStatus.NOT_FOUND);
    }
    let dataMess = [];
    for (let i = 0; i < dataRoom.length; i++) {
      const data = await this.prisma.messages.findMany({
        where: {
          room_id: dataRoom[i].room_id,
        },
        include: {
          users: true,
        },
      });
      dataMess.push({
        roomId: dataRoom[i].room_id,
        data: data,
      });
    }
    if (!dataMess) {
      throw new HttpException('Not found data', HttpStatus.NOT_FOUND);
    }
    return dataMess;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    if (id) {
      let deleteMess = await this.prisma.messages.deleteMany({
        where: {
          room_id: id,
        },
      });
      if (deleteMess) {
        return 'Delete ok';
      }
      throw new HttpException("Can't delete", HttpStatus.NOT_IMPLEMENTED);
    }
    throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
  }
}
