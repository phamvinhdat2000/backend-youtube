import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuardJwt } from 'src/auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuardJwt)
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @UseGuards(AuthGuardJwt)
  @Get(':videoId')
  getAllComment(@Param('videoId') videoId: string) {
    return this.commentService.getAllComment(+videoId);
  }
}
