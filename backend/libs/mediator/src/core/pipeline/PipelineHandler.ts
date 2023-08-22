import type { IRequest } from '../IRequest';
import { MediatorService } from '../../mediator.service';
import type { IPipelineHandler } from './IPipelineHandler';

export function PipelineHandler<T>(command: {
  new (...args: any[]): IRequest<T>;
}) {
  return (constructor: { new (...args: any[]): IPipelineHandler }) =>
    register(command, constructor);
}

function register<T>(
  command: { new (): IRequest<T> },
  constructor: { new (): IPipelineHandler },
) {
  MediatorService.registerPipelineHandler(command.name, constructor);
}
