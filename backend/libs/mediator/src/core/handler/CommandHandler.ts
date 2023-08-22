import type { IRequest } from '../IRequest';
import { MediatorService } from '../../mediator.service';
import type { IRequestHandler } from './IRequestHandler';

export function CommandHandler<T>(command: {
  new (...args: any[]): IRequest<T>;
}) {
  return (constructor: {
    new (...args: any[]): IRequestHandler<IRequest<any>>;
  }) => register(command, constructor);
}

function register<T>(
  command: { new (): IRequest<T> },
  constructor: { new (): IRequestHandler<IRequest<any>> },
) {
  MediatorService.registerCommandHandler(command.name, constructor);
}
