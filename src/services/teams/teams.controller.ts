import { Controller, Post, Body, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';


@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('create')
  async create(@Body() teamDto: TeamDto) {
    await this.teamsService.create(teamDto);
  }

  @Get()  
  login(createTeamDto: CreateTeamDto) {
    console.log("kaki");
  }

}
