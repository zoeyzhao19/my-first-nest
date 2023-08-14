import type { IRequest } from '../IRequest';

export interface IRequestHandler<
  C = IRequest<any>,
  R = C extends IRequest<infer U> ? U : never,
> {
  handle(command: C): Promise<R>;
}
