import { Module } from '@nestjs/common';
import {RoleService} from '../services/role.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/domain/roles/Role';
import { OnUserRegistered } from '@applications/role/subscriptions/OnUserRegistered';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    UserModule
  ],
  providers: [RoleService, OnUserRegistered]
})
export class RoleModule {}
