import type { IRequest } from '../IRequest';

export interface IPipelineHandler<T extends IRequest = any> {
  handle(command: T): any;
}
