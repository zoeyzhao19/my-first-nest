import { IPipelineHandler, PipelineHandler } from "@libs/mediator";
import { RegisterCommand } from "./RegisterCommand";
import { Injectable } from "@nestjs/common";
import {z} from 'zod'

@Injectable()
@PipelineHandler(RegisterCommand)
export class RegisterCommandValidation implements IPipelineHandler<RegisterCommand> {
  handle(command: RegisterCommand) {
    const schema = z.object({
      username: z.string().regex(/^[a-zA-Z0-9_]{4,16}$/, '用户名只能包含字母、数字、下划线，长度为4-16位'),
      password: z.string().min(6, '密码长度不能小于6位'),
      email: z.string().email('邮箱格式不正确'),
      nickname: z.string(),
      captcha: z.preprocess((val) => String(val), z.string().length(6, '验证码长度为6位'))
    })

    schema.parse(command)
  }
}