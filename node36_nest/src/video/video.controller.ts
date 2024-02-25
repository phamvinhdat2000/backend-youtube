import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  Query,
  Put,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { extname } from 'path';
import { AuthGuardJwt } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/auth/hasRole.decorator';
import { Role } from 'src/model/role.enum';

const filterFileThumbnail = (req, file, cb) => {
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
const filterFileVideo = (req, file, cb) => {
  const ext = extname(file.originalname);
  const allowedExtArr = ['.mp4'];
  if (!allowedExtArr.includes(ext)) {
    req.fileValidationError = `Wrong extension type, accepted file ext are:${allowedExtArr}`;
    cb(null, false);
  } else {
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1024 * 1024 * 15) {
      req.fileValidationError =
        'File size too large.Accepted file size is less than 15 MB';
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
};

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAllVideo() {
    return this.videoService.getAllVideo();
  }

  @Get('/video-by-admin')
  @HasRoles(Role.Admin)
  @UseGuards(AuthGuardJwt, RolesGuard)
  getAllVideoByAdmin() {
    return this.videoService.getAllVideoByAdmin();
  }

  @Get('/video-by-page')
  getAllVideoPage(@Query() query: any) {
    let { page, typeId, num } = query;
    return this.videoService.getAllVideoPage(+page, +typeId, +num);
  }

  @Get('/video-type/:typeId')
  getAllVideoByTypeId(@Param('typeId') typeId: string) {
    return this.videoService.getAllVideoByTypeId(+typeId);
  }

  @Get('/video-by-user/:userId')
  getAllVideoByUserId(@Param('userId') userId: string) {
    return this.videoService.getAllVideoByUserId(+userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuardJwt)
  @Get('/video-detail/:id')
  getVideoDetail(@Param('id') id: string) {
    return this.videoService.getVideoDetail(+id);
  }

  @Get('/video-by-search/:keySearch')
  getVideoBySearchKey(@Param('keySearch') keySearch: string) {
    return this.videoService.getVideoByKeySearch(keySearch);
  }

  @Get('/video-latest')
  getVideoLatest() {
    return this.videoService.getVideoLatest();
  }

  @Get('/video-type')
  getAllVideoType() {
    return this.videoService.getAllVideoType();
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + `_${file.originalname}`),
      }),
      fileFilter: filterFileThumbnail,
    }),
  )
  uploadInfVideo(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.videoService.uploadInfVideo(+id, file, body);
  }

  @Post('/upload-video/:id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: process.cwd() + '/public/video',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + `_${file.originalname}`),
      }),
      fileFilter: filterFileVideo,
    }),
  )
  uploadVideo(
    @Param('id') id: string,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.videoService.uploadVideo(+id, file);
  }

  @Put(':id')
  updateViews(@Param('id') id: string, @Body() body: any) {
    let { numViewIncrease } = body;
    return this.videoService.updateViews(+id, +numViewIncrease);
  }

  @ApiBearerAuth()
  @HasRoles(Role.Admin)
  @UseGuards(AuthGuardJwt, RolesGuard)
  @Delete('/delete-video-by-admin')
  remove(@Body() body: any) {
    const { videoId } = body;
    return this.videoService.remove(+videoId);
  }
}
