import { Global, Module } from '@nestjs/common';
import { MediatorService } from './mediator.service';
import {IMediatorService} from './';

@Global()
@Module({
  providers: [{
    provide: IMediatorService,
    useClass: MediatorService,
  }],
  exports: [IMediatorService],
})
export class MediatorModule {}
