import { DomainEvent } from "@libs/domain/core/DomainEvent";
import { EventbusService } from "../eventbus.service";
import { IDomainEventHandler } from "./IDomainEventHandler";

export function EventHandler(event: {
  new(...args: any[]): DomainEvent
}) {
  return (constructor: {
    new(...args: any[]): IDomainEventHandler
  }) => register(event, constructor);
}

function register(
    event: { new(...args: any[]): DomainEvent },
    constructor: { new(...args: any[]): IDomainEventHandler }
  ) {
    let handlers = EventbusService.subscribers.get(event.name) || [];
    if(!handlers.length) {
      EventbusService.subscribers.set(event.name, (handlers = []));
    }

    handlers.push(constructor);
}