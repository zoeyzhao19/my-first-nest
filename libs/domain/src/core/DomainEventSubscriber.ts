import type { DomainEvent, DomainEventClass } from './DomainEvent'

export interface DomainEventSubscriber<T extends DomainEvent = DomainEvent> {
  subscribeTo(): DomainEventClass[]
  on(domainEvent: T): PromiseLike<void>
}
