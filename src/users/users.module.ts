import { DetailsService } from './../details/services/details.service';
import { AuthModule } from './../auth/auth.module';
import { DetailsModule } from './../details/details.module';
import { Role } from './../roles/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { Detail } from 'src/details/entities/detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Role]), DetailsModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {
}
