import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);