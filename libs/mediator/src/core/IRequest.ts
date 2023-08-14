/**
 * trick for type infer
 */
export const ResponseFlags = Symbol('RequestFlags');

export interface IRequest<T = any> {
  [ResponseFlags]?: T;
}
