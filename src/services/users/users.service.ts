import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../../schemas/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './utils/constant';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email)
    if (!user){
      createUserDto['password'] = await bcrypt.hash(createUserDto.password, jwtConstants.saltOrRounds);
      const createdUser = new this.userModel(createUserDto);
      createdUser.save();
      return this.login(this.makePayloadJwt(createdUser));
    }
    console.log("Error: cannot create 2 users with same mail");
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument>{
    var doc = await this.userModel.findOne({email: email});
    return doc;
  }

  async findOne(id: string): Promise<UserDocument>{
    var doc = await this.userModel.findOne({name: id});
    return doc;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findOneByEmail(email);
    if (user){
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const token = this.login(this.makePayloadJwt(user));
        return token;
      }
    }
    return null;
  }

  async login(user: any){
      return {
          access_token: this.jwtService.sign(user)
      }
  }

  makePayloadJwt(user: CreateUserDto) {
    return {name: user.name, email: user.email}
  }

}
