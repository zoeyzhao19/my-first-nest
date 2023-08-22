import { IRequestHandler, CommandHandler } from "@libs/mediator";
import { SendCaptchaCommand } from "./SendCaptchaCommand";
import { Inject, Injectable } from "@nestjs/common";
import { RedisService } from "@services/redis.service";
import { EmailService } from "@services/email.service";

@CommandHandler(SendCaptchaCommand)
@Injectable()
export class SendCaptchaCommandHandler implements IRequestHandler<SendCaptchaCommand> {
  @Inject(RedisService)
  private redisService: RedisService

  @Inject(EmailService)
  private emailService: EmailService

  async handle(command: SendCaptchaCommand) {
    const code = Math.random().toString().slice(2,8);
    await this.redisService.set(`captcha_${command.captchaType}_${command.email}`, code, 5 * 60);
    // await this.emailService.send(this.getEmailBody(command, code));
  }

  getEmailBody(command: SendCaptchaCommand, code: string) {
    let result = {} as {
      to: string;
      subject: string;
      html: string;
    }
    switch (command.captchaType) {
      case 'register':
        result = {
          to: command.email,
          subject: '注册验证码',
          html: `<p>你的注册验证码是 ${code}</p>`
        }
        break;
      case 'update_password':
        result = {
          to: command.email,
          subject: '更改密码验证码',
          html: `<p>你的更改密码验证码是 ${code}</p>`
        }
        break;
      default:
        break;
    }

    return result
  }
}