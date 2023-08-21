import { Test, TestingModule } from '@nestjs/testing';
import { MediatorService } from './mediator.service';
import { IRequest, ResponseFlags } from './core/IRequest';
import { CommandHandler } from './core/handler/CommandHandler';
import { IRequestHandler } from './core/handler/IRequestHandler';
import { PipelineHandler } from './core/pipeline/PipelineHandler';
import { IPipelineHandler } from './core/pipeline/IPipelineHandler';
import { Injectable } from '@nestjs/common';

const command_spy = jest.fn(async () => {
  return {
    id: 1,
  };
});

const validation_spy_1 = jest.fn()
const validation_spy_2 = jest.fn()

interface CourseResponse {
  id: number;
}
class CourseCommand implements IRequest<CourseResponse> {
  name: string;
  duration: string;
  [ResponseFlags]: CourseResponse;

  constructor() {
    this.name = 'chinese';
    this.duration = '45mins';
  }
}

@CommandHandler(CourseCommand)
@Injectable()
class CourseCommandHandler
  implements IRequestHandler<CourseCommand>
{
  handle(_command: CourseCommand): Promise<CourseResponse> {
    return command_spy();
  }
}

@PipelineHandler(CourseCommand)
@Injectable()
class ValidationPipeline implements IPipelineHandler<CourseCommand> {
  handle(command: CourseCommand) {
    validation_spy_1()
  }
}

@PipelineHandler(CourseCommand)
@Injectable()
class ValidationPipeline2 implements IPipelineHandler<CourseCommand> {
  handle(command: CourseCommand) {
    validation_spy_2()
  }
}

describe('MediatorService', () => {
  let service: MediatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediatorService, CourseCommandHandler, ValidationPipeline, ValidationPipeline2],
    }).compile();

    service = module.get<MediatorService>(MediatorService);
  });

  test('should emit proper handler', async () => {
    expect(MediatorService.commandHandlers.size).toBe(1);
    expect(MediatorService.commandHandlers.get(CourseCommand.name)).toBe(
      CourseCommandHandler,
    );

    expect(MediatorService.pipelines.size).toBe(1)
    expect(MediatorService.pipelines.get(CourseCommand.name)).toHaveLength(2)
    expect(MediatorService.pipelines.get(CourseCommand.name)).toEqual([ValidationPipeline, ValidationPipeline2])

    await service.send(new CourseCommand())
    
    expect(validation_spy_1).toHaveBeenCalledTimes(1)
    expect(validation_spy_2).toHaveBeenCalledTimes(1)
    expect(command_spy).toHaveBeenCalledTimes(1);
  });

});
