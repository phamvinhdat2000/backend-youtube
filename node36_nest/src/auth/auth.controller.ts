import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import { registerUserDTO } from './dto/register-user.dto';
import { AuthGuardJwt } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: loginDTO): Promise<string> {
    return this.authService.login(body);
  }

  @Post('/sign-up')
  register(@Body() body: registerUserDTO): Promise<any> {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuardJwt)
  @Post('/logout')
  logout(@Body() body: any) {
    const { user_id } = body;
    return this.authService.logout(user_id);
  }

  @Post('/refresh-tokens')
  refreshTokens(@Body() body: any) {
    let { refresh_token } = body;

    return this.authService.refreshTokens(refresh_token);
  }

  @Post('/login-facebook')
  loginByFb(@Body() body: any): Promise<any> {
    return this.authService.loginByFb(body);
  }
}
