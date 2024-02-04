import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginDTO } from './dto/login.dto';
import { registerUserDTO } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { promises } from 'dns';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardJwt } from './auth.guard';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() body: loginDTO): Promise<string> {
    return this.authService.login(body);
  }

  @Post("/sign-up")
  register(@Body() body: registerUserDTO): Promise<any> {
    return this.authService.register(body)
  }

  // @UseGuards(AuthGuardJwt)
  @Post("/logout")
  logout(@Body() body:any){
   const {user_id}=body;
   return this.authService.logout(user_id)
  }

  // @UseGuards(AuthGuard("rf-jwt"))
  @Post("/refresh-tokens")
  refreshTokens(@Body() body:any){
  let {refresh_token}=body;

   return this.authService.refreshTokens(refresh_token);
  }

  @Post("/login-facebook")
  loginByFb(@Body() body: any): Promise<any> {
    return this.authService.loginByFb(body)
  }
}
