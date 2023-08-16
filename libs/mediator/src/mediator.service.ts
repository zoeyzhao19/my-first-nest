import { Injectable } from '@nestjs/common';
import type { IRequest } from './core/IRequest';
import type { IRequestHandler } from './core/handler/IRequestHandler';
import type { IPipeBehavior } from './core/pipeline/IPipelineBehavior';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MediatorService {
  static handlers: Map<
    string,
    { new (): IRequestHandler<IRequest<any>> }
  > = new Map();
  static pipelines: Map<string, { new (): IPipeBehavior }[]> = new Map();
  static handlerResolver:
    | ((
        handler: new () => IRequestHandler<IRequest<any>>,
      ) => IRequestHandler<IRequest<any>>)
    | undefined;
  static pipelineResolver:
    | ((
        pipeline: new () => IPipeBehavior<IRequest<any>>,
      ) => IPipeBehavior<IRequest<any>>)
    | undefined;

  static registerHandler<T>(
    commandName: string,
    handler: { new (): IRequestHandler<IRequest<T>> },
  ) {
    this.handlers.set(commandName, handler);
  }

  static registerPipeline(
    commandName: string,
    handler: { new (): IPipeBehavior },
  ) {
    let pipelineHandlers = this.pipelines.get(commandName);
    if (!pipelineHandlers)
      this.pipelines.set(commandName, (pipelineHandlers = []));

    pipelineHandlers?.push(handler);
  }

  constructor(private moduleRef: ModuleRef) {}

  async send<T extends IRequest>(
    command: T,
  ): Promise<T extends IRequest<infer R> ? R : never> {
    const Handler = MediatorService.handlers.get(command.constructor.name);
    let handler: IRequestHandler<T>;
    if (!Handler)
      throw new Error(
        `Handler for ${command.constructor.name} is not registered in Mediator}`,
      );

    handler = this.moduleRef.get(Handler, {strict: false})
    if (!handler)
      throw new Error(
        `Handler for ${command.constructor.name} is registered but cannot resolved by handlerResolver`,
      );

    let currentPipelineIndex = 0;
    const pipelineHandlers =
      MediatorService.pipelines.get(command.constructor.name) || [];
    const next = () => {
      if (currentPipelineIndex === pipelineHandlers.length) return;
      let pipelineHandler: IPipeBehavior<T>;
      pipelineHandler = this.moduleRef.get(
        pipelineHandlers[currentPipelineIndex], {strict: false}
      );
      if (!pipelineHandler )
        throw new Error(
          `Pipelines for ${command.constructor.name} are registered but cannot resolved by pipelineResolver`,
        );

      currentPipelineIndex++;
      pipelineHandler.handle(command, next);
    };
    next();

    return await handler.handle(command);
  }
}
