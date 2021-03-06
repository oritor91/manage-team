import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './services/users/users.module';
import { AuthModule } from './services/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './services/teams/teams.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot("mongodb+srv://orito:0108Chica19@cluster0.fdd0p.mongodb.net/FootballApp?retryWrites=true&w=majority"), 
    AuthModule,
    TeamsModule
  ],
  providers: [AppService],
})
export class AppModule {}
