import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user/user.schema';
import { parsePhoneNumber } from 'libphonenumber-js';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) {}

    async create(createUserDto: CreateUserDto) {
      console.log("in create");
  }

  async validateUser(phone: string): Promise<any> {
    var val = Math.floor(1000 + Math. random() * 9000);
    console.log(val);
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
