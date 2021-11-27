import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user/user.schema';
import { parsePhoneNumber } from 'libphonenumber-js';
import { OtpRequestService } from '../otpRequest/otpRequest.service';
import { OtpPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private otpRequest: OtpRequestService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async validateUser(phone: string): Promise<any> {
    const parsedPhone = parsePhoneNumber(phone, 'IL').number.toString();
    const otpRequest = this.create_otprequest_object(parsedPhone);
    this.otpRequest.add_otprequest_record(otpRequest);
    return parsedPhone;
  }

  async validateOtp(otpPayload: OtpPayload): Promise<boolean> {
    const { code, phone } = otpPayload;
    const parsedPhone = parsePhoneNumber(phone, 'IL').number.toString();
    return this.otpRequest.validate_otp_record(parsedPhone, code);
  }

  async validateToken(token: string): Promise<boolean> {
    return !!this.jwtService.verify(token);
  }

  async loginByPhoneNumber(phoneNumber: string) {
    const parsedPhone = parsePhoneNumber(phoneNumber, 'IL').number.toString();
    const user = await this.usersService.findOneByPhone(parsedPhone);
    return {
      access_token: this.jwtService.sign(this.makePayloadJwt(user)),
    };
  }

  makePayloadJwt(user: CreateUserDto) {
    return { name: user.name, email: user.phone };
  }

  create_otprequest_object(phone: string) {
    var val = Math.floor(1000 + Math.random() * 9000);
    var currentDate = new Date();
    const expiryTime = new Date(currentDate.getTime() + 15 * 60000);
    const otpRequest = { phone: phone, code: val, expiryTime: expiryTime };
    console.log('generated otp code: ' + val);
    return otpRequest;
  }
}
