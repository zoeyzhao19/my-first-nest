import type { DomainEvent } from './DomainEvent'
// import { Entity } from './Entity'

// export abstract class AggregateRoot extends Entity
export abstract class AggregateRoot {
   #domainEvents: Array<DomainEvent>

  constructor() {
    this.#domainEvents = []
  }

  // abstract toPrimitives(): any

  addDomainEvent(event: DomainEvent) {
    this.#domainEvents.push(event)
  }

  /**
   * get all cloned domain events in a entity
   */
  pullDomainEvents(): Array<DomainEvent> {
    const events = this.#domainEvents.slice()
    this.#domainEvents = []
    return events
  }

  getDomainEvents(eventName?: string): Array<DomainEvent> {
    if(eventName) {
      let events = []
      this.#domainEvents = this.#domainEvents.map(event => {
        if(event.eventName === eventName) {
          events.push(event)
          return null
        } else {
          return event
        }
      }).filter(Boolean)
      return events
    } else {
      const events = this.#domainEvents.slice()
      this.#domainEvents = []
      return events
    }
  }
}
