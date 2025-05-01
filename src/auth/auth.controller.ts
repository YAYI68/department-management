import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInput } from './dto/sign-inputs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signInput: SignInput) {
    return this.authService.create(signInput);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginInput: SignInput) {
    return this.authService.login(loginInput);
  }
}
