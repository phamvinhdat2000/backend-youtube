import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuardJwt } from 'src/auth/auth.guard';
import { query } from 'express';
import { HasRoles } from 'src/auth/hasRole.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuardJwt)
  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @UseGuards(AuthGuardJwt)
  @Get()
  getAllMessageByUser(@Query() query:any) {
    let {room_id}=query
    return this.messageService.getAllMessageByUser(+room_id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AuthGuardJwt,RolesGuard)
  @Get('admin')
  getAllMessageByAdmin() {
    return this.messageService.getAllMessageByAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }


  @UseGuards(AuthGuardJwt)
  @Delete()
  remove(@Body() body: any) {
    let {id}=body;
    return this.messageService.remove(+id);
  }
}
