import { IPipelineHandler, PipelineHandler } from "@libs/mediator";
import { CreateMeetingCommand } from "./CreateMeetingCommand";
import {z, ZodError} from 'zod'
import { Injectable } from "@nestjs/common";

@Injectable()
@PipelineHandler(CreateMeetingCommand)
export class CreateMeetingCommandValidation implements IPipelineHandler<CreateMeetingCommand> {
  handle(command: CreateMeetingCommand) {
    const schema = z.object({
      startTime: z.date().min(new Date(), '开始时间不能小于当前时间').max(command.endTime, '开始时间不能大于结束时间'),
      endTime: z.date().min(command.startTime, '结束时间不能小于开始时间'),
      roomId: z.string({
        required_error: '会议室不能为空'
      }),
      subject: z.string({
        required_error: '会议主题不能为空'
      }),
      issuerId: z.string({
        required_error: '发起人不能为空'
      }),
      participants: z.string().array().nonempty('参与人不能为空')
    })

    schema.parse(command)
  }
}
