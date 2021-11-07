import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '../../schemas/user/user.schema';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneByPhone(phone: string): Promise<UserDocument>{
    var doc = await this.userModel.findOne({phone: phone});
    return doc;
  }

  async findOne(id: string): Promise<UserDocument>{
    var doc = await this.userModel.findOne({name: id});
    return doc;
  }

}
