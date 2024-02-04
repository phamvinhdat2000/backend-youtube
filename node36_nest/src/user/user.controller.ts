import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { extname } from 'path';
import { request } from 'http';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

const filterFileAvatar=(req,file,cb)=>{
  const ext=extname(file.originalname);
  const allowedExtArr=[".jpg",".png",".jpeg"];
  if (!allowedExtArr.includes(ext)){
    req.fileValidationError=`Wrong extension type, accepted file ext are:${allowedExtArr}`;
    cb(null,false);
  }else{
    const fileSize=parseInt(req.headers['content-length']);
    if(fileSize>1024*1024*3){
      req.fileValidationError="File size too large.Accepted file size is less than 3 MB";
      cb(null,false);
    }else{
      cb(null,true);
    }
  }
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/get-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }
  
  @Get("/token")
  getUserByToken(@Query() queryParam:any){
    let {accessToken}=queryParam;
    return this.userService.getUserByToken(accessToken);
  }
 
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(
            null, // define lỗi (ignore)
            new Date().getTime() + `_${file.originalname}`,
          ),
      }),
      fileFilter:filterFileAvatar
    }),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Param("id") id:string,
    @Req() req:any,
    @Body() body:UpdateUserDto,
    @UploadedFile() file:Express.Multer.File 
  ) {

    if(req.fileValidationError){
      throw new BadRequestException(req.fileValidationError);
    }
    // if(!file){
    //   throw new BadRequestException("File is required");
    // }
    return this.userService.update(+id,file,body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
