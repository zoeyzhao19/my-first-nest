import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { RedisModule } from './redis.module';
import { EmailModule } from './email.module';

@Module({
  imports: [UserModule, RedisModule, EmailModule]
})
export class IndexModule {}
