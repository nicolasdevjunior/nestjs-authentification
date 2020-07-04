import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserProviders } from './providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserRoleController } from './user-role/user-role.controller';
import { UserRoleProviders } from './providers/user.role.providers';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports:[DatabaseModule,
    MulterModule.register({
      dest : './files', 
      limits:{
        // fileSize : 1
      }
    })], 
  providers: [UsersService,...UserProviders,...UserRoleProviders],
  exports: [UsersService],
  controllers: [UsersController, UserRoleController],
})
export class UsersModule {}