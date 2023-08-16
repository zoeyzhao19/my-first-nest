import { Test, TestingModule } from '@nestjs/testing';
import { MediatorService } from './mediator.service';
import { IRequest, ResponseFlags } from './core/IRequest';
import { registerHandler } from './core/handler/registerHandler';
import { IRequestHandler } from './core/handler/IRequestHandler';
import { registerPipeline } from './core/pipeline/registerPipeline';
import { IPipeBehavior } from './core/pipeline/IPipelineBehavior';

interface CourseResponse {
  id: number;
}
class CourseCommand implements IRequest<CourseResponse> {
  name: string;
  duration: string;
  [ResponseFlags]?: CourseResponse;

  constructor() {
    this.name = 'chinese';
    this.duration = '45mins';
  }
}

describe('MediatorService', () => {
  let service: MediatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediatorService],
    }).compile();

    service = module.get<MediatorService>(MediatorService);
  });

  test('should emit proper handler', async () => {
    const spy = jest.fn(async () => {
      return {
        id: 1,
      };
    });

    @registerHandler(CourseCommand)
    class CourseCommandHandler
      implements IRequestHandler<CourseCommand>
    {
      handle(_command: CourseCommand): Promise<CourseResponse> {
        return spy();
      }
    }

    expect(MediatorService.handlers.size).toBe(1);
    expect(MediatorService.handlers.get(CourseCommand.name)).toBe(
      CourseCommandHandler,
    );
    await service.send(new CourseCommand());

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('pipeline', async () => {
    @registerPipeline(CourseCommand)
    class ValidationPipeline implements IPipeBehavior {
      handle(command: CourseCommand, next: () => void) {
        if (command.name.length > 6)
          throw new Error('name is too long')
        return next()
      }
    }

    expect(MediatorService.pipelines.size).toBe(1)
    expect(MediatorService.pipelines.get(CourseCommand.name)).toHaveLength(1)
    expect(MediatorService.pipelines.get(CourseCommand.name)).toEqual([ValidationPipeline])

    await expect(service.send(new CourseCommand())).rejects.toThrowError('name is too long')
  })
});
