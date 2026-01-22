import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginBodyDTO,
  LoginResDTO,
  LogoutBodyDTO,
  LogoutResDTO,
  RefreshTokenBodyDTO,
  RegisterBodyDTO,
  RegisterResDTO,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO): Promise<RegisterResDTO> {
    return new RegisterResDTO(await this.authService.register(body));
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body));
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    console.log(123);
    return this.authService.refreshToken(body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: LogoutBodyDTO) {
    return new LogoutResDTO(await this.authService.logout(body.refreshToken));
  }
}
