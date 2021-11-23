import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SmsTimePeriod } from 'src/types/smsTimePeriod.type';
import { User } from '../user/user.schema';
import { Team } from './team.schema';

export type TeamPlayerDocument = TeamPlayer & Document;

@Schema()
export class TeamPlayer {
  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
  player: User;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Team'})
  teamId: Team;

  @Prop()
  regularMember: Boolean;

  @Prop()
  smsTimePeriod: SmsTimePeriod;

}

export const TeamPlayerSchema = SchemaFactory.createForClass(TeamPlayer);