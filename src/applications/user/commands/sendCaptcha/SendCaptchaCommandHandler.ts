import { IRequestHandler, registerHandler } from "@libs/mediator";
import { SendCaptchaCommand } from "./SendCaptchaCommand";
import { Inject, Injectable } from "@nestjs/common";
import { RedisService } from "@services/redis.service";
import { EmailService } from "@services/email.service";

@registerHandler(SendCaptchaCommand)
@Injectable()
export class SendCaptchaCommandHandler implements IRequestHandler<SendCaptchaCommand> {
  @Inject(RedisService)
  private redisService: RedisService

  @Inject(EmailService)
  private emailService: EmailService

  async handle(command: SendCaptchaCommand) {
    const code = Math.random().toString().slice(2,8);
    await this.redisService.set(`captcha_${command.email}`, code, 5 * 60);
    await this.emailService.send({
      to: command.email,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`
    });
  }
}