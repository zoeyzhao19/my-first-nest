import type { IRequest } from '../IRequest';
import { MediatorService } from '../../mediator.service';
import type { IPipeBehavior } from './IPipelineBehavior';

export function registerPipeline<T>(command: {
  new (...args: any[]): IRequest<T>;
}) {
  return (constructor: { new (...args: any[]): IPipeBehavior }) =>
    register(command, constructor);
}

function register<T>(
  command: { new (): IRequest<T> },
  constructor: { new (): IPipeBehavior },
) {
  MediatorService.registerPipeline(command.name, constructor);
}
