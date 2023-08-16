import type { IRequest } from '../IRequest';

export interface IRequestHandler<
  C = IRequest<any>,
> {
  handle(command: C): Promise<C extends IRequest<infer U> ? U : never>;
}
