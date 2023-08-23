// import { IPipelineHandler, PipelineHandler } from "@libs/mediator";
// import { CreateMeetingCommand } from "./CreateMeetingCommand";

// @PipelineHandler(CreateMeetingCommand)
// export class CreateMeetingCommandValidation implements IPipelineHandler<CreateMeetingCommand> {
//   handle(command: CreateMeetingCommand) {
//     if (command.startTime.getTime() > command.endTime.getTime()) {
//       throw new Error('开始时间不能大于结束时间')
//     }
//   }
// }