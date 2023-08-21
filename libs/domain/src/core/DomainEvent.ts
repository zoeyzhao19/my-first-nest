
export abstract class DomainEvent {
  readonly aggregateId?: string
  readonly eventId: string
  readonly occurredOn: Date
  readonly eventName: string

  constructor(aggregateId?: string) {
    this.aggregateId = aggregateId
    this.occurredOn = new Date()
    this.eventName = this.constructor.name
  }
}


export interface DomainEventClass {
  EVENT_NAME: string
}
