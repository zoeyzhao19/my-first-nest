/**
 * trick for type infer
 */
export const ResponseFlags = Symbol('RequestFlags');

export interface IRequest<Response = any> {
  [ResponseFlags]?: Response;
}
