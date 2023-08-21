import { Injectable } from '@nestjs/common';
import { IDomainEventHandler } from './core/IDomainEventHandler';
import { ModuleRef } from '@nestjs/core';
import { DomainEvent } from '@libs/domain/core/DomainEvent';

@Injectable()
export class EventbusService {
  static subscribers: Map<string, { new (): IDomainEventHandler }[]> = new Map();

  constructor(private moduleRef: ModuleRef) {}

  publish(events: DomainEvent[]) {
    for(const event of events) {
      const Handlers = EventbusService.subscribers.get(event.constructor.name) || [];

      for(const Handler of Handlers) {
        const instance = this.moduleRef.get(Handler, {strict: false});
        if(!instance) continue;
        instance.on(event);
      }
    }
  }
}
