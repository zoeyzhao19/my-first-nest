import type { IRequest } from '../IRequest';

export interface IPipeBehavior<T extends IRequest = any> {
  handle(command: T, next: () => void): any;
}
