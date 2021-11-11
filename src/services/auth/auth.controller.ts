import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { cp } from "fs";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.authService.create(createUserDto);
    return res;
  }

  @Post("login")  
  async login(@Body() phone: object) {
    const res = await this.authService.validateUser(phone['phone']);
    return res;
  }

}