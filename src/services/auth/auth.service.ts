import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './utils/constant';
import { UserDocument } from 'src/schemas/user/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

    async create(createUserDto: CreateUserDto) {
      const user = await this.usersService.findOneByPhone(createUserDto.phone)
      if (!user){
        createUserDto['password'] = await bcrypt.hash(createUserDto.password, jwtConstants.saltOrRounds);
        var db_user = await this.usersService.create(createUserDto);
        const token = await this.login(db_user);
        return token;
      }
      return null;
  }

  async validateUser(phone: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByPhone(phone);
    if (user){
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async login(user: UserDocument){
    return {
        access_token: this.jwtService.sign(this.makePayloadJwt(user))
    }
  }

  makePayloadJwt(user: CreateUserDto) {
    return {name: user.name, email: user.phone}
  } 
}
