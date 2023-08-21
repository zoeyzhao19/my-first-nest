import { DomainEvent } from "@libs/domain/core/DomainEvent";

export interface IDomainEventHandler {
  on(events: DomainEvent): Promise<void>
}