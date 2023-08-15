import { Global, Module } from '@nestjs/common';
import { MediatorService } from './mediator.service';

@Global()
@Module({
  providers: [MediatorService],
  exports: [MediatorService],
})
export class MediatorModule {}
