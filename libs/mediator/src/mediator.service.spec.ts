import { Test, TestingModule } from '@nestjs/testing';
import { MediatorService } from './mediator.service';
import { IRequest, ResponseFlags } from './core/IRequest';
import { CommandHandler } from './core/handler/CommandHandler';
import { IRequestHandler } from './core/handler/IRequestHandler';
import { PipelineHandler } from './core/pipeline/PipelineHandler';
import { IPipelineHandler } from './core/pipeline/IPipelineHandler';
import { Injectable } from '@nestjs/common';

const spy = jest.fn(async () => {
  return {
    id: 1,
  };
});

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
    return spy();
  }
}

@PipelineHandler(CourseCommand)
@Injectable()
class ValidationPipeline implements IPipelineHandler<CourseCommand> {
  handle(command: CourseCommand) {
    if (command.name.length > 6)
      throw new Error('name is too long')
  }
}

describe('MediatorService', () => {
  let service: MediatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediatorService, CourseCommandHandler, ValidationPipeline],
    }).compile();

    service = module.get<MediatorService>(MediatorService);
  });

  test('should emit proper handler', async () => {
    expect(MediatorService.commandHandlers.size).toBe(1);
    expect(MediatorService.commandHandlers.get(CourseCommand.name)).toBe(
      CourseCommandHandler,
    );

    expect(MediatorService.pipelines.size).toBe(1)
    expect(MediatorService.pipelines.get(CourseCommand.name)).toHaveLength(1)
    expect(MediatorService.pipelines.get(CourseCommand.name)).toEqual([ValidationPipeline])

    await expect(service.send(new CourseCommand())).rejects.toThrowError('name is too long')

    expect(spy).toHaveBeenCalledTimes(0);
  });

});
