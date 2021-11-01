import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './services/users/users.module';
import { AuthModule } from './services/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/nest'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
