import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, default: true })
  selfRegistered: boolean;

  @Prop({ required: true })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
