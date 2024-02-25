import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuardJwt } from 'src/auth/auth.guard';

const filterFileAvatar = (req, file, cb) => {
  const ext = extname(file.originalname);
  const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  if (!allowedExtArr.includes(ext)) {
    req.fileValidationError = `Wrong extension type, accepted file ext are:${allowedExtArr}`;
    cb(null, false);
  } else {
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 3) {
      req.fileValidationError =
        'File size too large.Accepted file size is less than 3 MB';
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
};

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Get('/token')
  getUserByToken(@Query() queryParam: any) {
    let { accessToken } = queryParam;
    return this.userService.getUserByToken(accessToken);
  }

  @UseGuards(AuthGuardJwt)
  @Post(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + `_${file.originalname}`),
      }),
      fileFilter: filterFileAvatar,
    }),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return this.userService.update(+id, file, body);
  }
}
