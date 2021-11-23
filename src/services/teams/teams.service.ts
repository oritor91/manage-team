import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from '../../schemas/team/team.schema';
import { UsersService } from '../users/users.service';
import { User } from 'src/schemas/user/user.schema';
import { TeamPlayer } from 'src/schemas/team/teamPlayer.schema';
import { mockTeamPlayer, TeamDto } from './dto/team.dto';



@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    private usersService: UsersService
  ) {}

  async create(teamDto: TeamDto) {
    const createTeamDto = {};
    for (var i in teamDto) createTeamDto[i] = teamDto[i];
    createTeamDto['managers'] = await this.get_users_ids(teamDto['managers']);
    createTeamDto['players'] = await this.get_players_ids(teamDto['players']);
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll(): Promise<TeamDocument[]> {
    return this.teamModel.find().exec();
  }

  async findOne(id: string): Promise<TeamDocument>{
    var doc = await this.teamModel.findOne({name: id});
    return doc;
  }

  async get_players_ids(players: mockTeamPlayer[]): Promise<TeamPlayer[]>{
      var team_players = [];
      for (const index in players){
          var tmp_player = {}
          const player_name = players[index]['player'];
          const db_player = await this.get_user(player_name);
          if (db_player){
            tmp_player['player'] = db_player['id'];
            tmp_player['teamId'] = players[index]['teamId'];
            tmp_player['regularMember'] = players[index]['regularMember'];
            tmp_player['smsTimePeriod'] = players[index]['smsTimePeriod'];
            team_players.push(tmp_player);
          }else{
              console.log("no such player => " + player_name);
          }
      }
      return team_players;
  }
  async get_users_ids(users: string[]): Promise<[]>{
    var db_users:any = [];
    for (const index in users){
        const user_name = users[index];
        const db_user = await this.get_user(user_name);
        if (db_user){
            db_users.push(db_user['doc']);
        }
    }
    return db_users;
  }

  async get_user(user: string): Promise<Object>{
      const db_user = await this.usersService.findOne(user);
      if (!db_user){
          console.log("no such user - would you like to create one?");
          return null;
      }
      else{
          return db_user;
      }
  }

}
