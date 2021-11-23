import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Payments } from 'src/types/payments.type';
import { Settings } from 'src/types/settings.type';
import { Time } from 'src/types/time.type';
import { User } from '../user/user.schema';
import { TeamPlayer } from './teamPlayer.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({required: true})
  name: string;

  @Prop([{type: MongooseSchema.Types.ObjectId, ref: 'User'}])
  managers: User;

  @Prop()
  location: string;

  @Prop({type: Object})
  settings: Settings;

  @Prop({type: Object})
  payments: Payments;

  @Prop()
  time: Time[];

  @Prop()
  players: TeamPlayer[];

}

export const TeamSchema = SchemaFactory.createForClass(Team);