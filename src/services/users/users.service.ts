import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, NewUserDto } from './dto/create-user.dto';
import { User, UserDocument } from '../../schemas/user/user.schema';
import { parsePhoneNumber } from 'libphonenumber-js';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const normalizedPhoneNumber = parsePhoneNumber(
      createUserDto.phone,
      'IL',
    ).number.toString();
    const userDoc: NewUserDto = {
      ...createUserDto,
      phone: normalizedPhoneNumber,
      selfRegistered: true,
      lastLogin: new Date(),
    };
    const createdUser = new this.userModel(userDoc);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneByPhone(phone: string): Promise<UserDocument> {
    var doc = await this.userModel.findOne({ phone: phone });
    return doc;
  }

  async findOne(id: string): Promise<Object> {
    console.log('looking for user: ' + id);
    var doc = await this.userModel.findOne({ name: id });
    return {
      doc: doc,
      id: doc._id,
    };
  }
}
