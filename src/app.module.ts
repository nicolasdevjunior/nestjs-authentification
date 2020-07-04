import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './socket/events.module';
import { FormationModule } from './formation/formation.module';
@Module({
  imports: [AuthModule, UsersModule, FormationModule,],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
 