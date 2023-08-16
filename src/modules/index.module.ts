import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { RedisModule } from './redis.module';
import { EmailModule } from './email.module';
import { RoleModule } from './role.module';

@Module({
  imports: [UserModule, RedisModule, EmailModule, RoleModule]
})
export class IndexModule {}
