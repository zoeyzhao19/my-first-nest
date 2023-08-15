import { v4 as uuid4 } from 'uuid'

export abstract class DomainEvent {
  static EVENT_NAME: string

  readonly aggregateId: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly eventName: string

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId
    this.eventId = eventId || uuid4()
    this.occurredOn = occurredOn || new Date()
    this.eventName = eventName
  }
}

// type DomainEventAttributes = any

export interface DomainEventClass {
  EVENT_NAME: string
}
