import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    if (Object.keys(createUserDto).length > 0) {
      const res = await this.authService.create(createUserDto);
      const { phone } = res;
      await this.authService.validateUser(phone);
      return { phone };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Post('login')
  async login(@Body('phone') phone: string) {
    const parsedPhone = await this.authService.validateUser(phone);
    return { phone: parsedPhone };
  }

  @Post('validateOtp')
  async validateOtp(
    @Body('phone') phone: string,
    @Body('code') code: string,
  ): Promise<{ access_token: string }> {
    const isValid = await this.authService.validateOtp({
      phone,
      code: Number(code),
    });
    if (isValid) {
      return this.authService.loginByPhoneNumber(phone);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('validateToken')
  async validateToken(
    @Body('token') token: string,
  ): Promise<{ success: boolean }> {
    const isValid = await this.authService.validateToken(token);
    if (isValid) {
      return { success: true };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
