import { IPipelineHandler, PipelineHandler } from "@libs/mediator";
import { LoginCommand } from "./LoginCommand";
import { Injectable } from "@nestjs/common";
import {z} from 'zod'

@Injectable()
@PipelineHandler(LoginCommand)
export class LoginCommandValidation implements IPipelineHandler<LoginCommand> {
  handle(command: LoginCommand) {
    const schema = z.object({
      username: z.string({
        required_error: '用户名不能为空'
      }),
      password: z.string({
        required_error: '密码不能为空'
      })
    })

    schema.parse(command)
  }
}