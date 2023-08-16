import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {createClient} from 'redis'
import {RedisService} from '../services/redis.service'

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('redis_host'),
            port: configService.get('redis_port')
          },
          database: configService.get('redis_db')
        })
        await client.connect()
        return client
      },
      inject: [ConfigService]
    },
    RedisService
  ],
  exports: [RedisService]
})
export class RedisModule {}
