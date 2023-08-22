import { ResponseFlags, IRequest } from "@libs/mediator";

export class UpdateFrozenStatusCommand implements IRequest<void> {
  [ResponseFlags]: void

  userId: string;

  operation: 'frozen' | 'unfrozen'

  constructor(userId: string, operation: 'frozen' | 'unfrozen') {
    this.userId = userId
    this.operation = operation
  }
}