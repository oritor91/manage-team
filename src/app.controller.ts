
import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from './services/auth/local-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { CreateUserDto } from './services/users/dto/create-user.dto';
import { JwtAuthGuard } from './services/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
      return await this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto){
      return this.authService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req){
      return req.user;
  }
}
