import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpRequestDocument = OtpRequest & Document;

@Schema()
export class OtpRequest {
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  expiryTime: Date;
}

export const OtpRequestSchema = SchemaFactory.createForClass(OtpRequest);
