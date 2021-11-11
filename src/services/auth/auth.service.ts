import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user/user.schema';
import { E164Number, parsePhoneNumber } from 'libphonenumber-js';
import { OtpRequestService } from '../otpRequest/otpRequest.service';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private otpRequest: OtpRequestService,
    private jwtService: JwtService) {}

    async create(createUserDto: CreateUserDto) {
      console.log("in create");
  }

  async validateUser(phone: string): Promise<any> {
    const parsedPhone = parsePhoneNumber(phone, 'IL');
    const otpRequest = this.create_otprequest_object(String(parsedPhone.number));
    this.otpRequest.add_otprequest_record(otpRequest);
  }

  async login(user: UserDocument){
    return {
        access_token: this.jwtService.sign(this.makePayloadJwt(user))
    }
  }

  makePayloadJwt(user: CreateUserDto) {
    return {name: user.name, email: user.phone}
  }

  create_otprequest_object(phone: string){
    var val = Math.floor(1000 + Math. random() * 9000);
    var currentDate = new Date();
    console.log(currentDate);
    const expiryTime = new Date(currentDate.getTime() + 15*60000);
    console.log(expiryTime);
    const otpRequest = {"phone": phone, "code": val, "expiryTime": expiryTime};
    console.log("generated otp code: " + val);
    return otpRequest;
  }
}
