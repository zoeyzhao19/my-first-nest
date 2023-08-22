import { Test, TestingModule } from '@nestjs/testing';
import { EventbusService } from './eventbus.service';
import { Injectable } from '@nestjs/common';
import { EventHandler } from './core/EventHandler';
import { DomainEvent } from '@libs/domain/core/DomainEvent';
import { IDomainEventHandler } from './core/IDomainEventHandler';

const spy = jest.fn(async () => {});

class CourseAddedDomainEvent extends DomainEvent {
  constructor() {
    super()
  }
}

@Injectable()
@EventHandler(CourseAddedDomainEvent)
export class OnCourseAdded implements IDomainEventHandler {
  async on(event: CourseAddedDomainEvent) {
    spy()
  }
}

describe('EventbusService', () => {
  let service: EventbusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventbusService, OnCourseAdded],
    }).compile();

    service = module.get<EventbusService>(EventbusService);
  });

  it('should execute handler upon event published', async () => {
    service.publish([new CourseAddedDomainEvent()])
    await Promise.resolve()
    expect(spy).toBeCalledTimes(1)
  });
});
