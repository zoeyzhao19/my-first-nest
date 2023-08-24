import { IRequestHandler, CommandHandler } from "@libs/mediator";
import { RefreshTokenCommand } from "./RefreshTokenCommand";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@CommandHandler(RefreshTokenCommand)
@Injectable()
export class RefreshTokenCommandHandler implements IRequestHandler<RefreshTokenCommand> {

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  async handle(command: RefreshTokenCommand) {
    try {
      const payload = await this.jwtService.verifyAsync(command.refresh_token);

      const access_token = this.jwtService.sign({
        sub: payload.sub,
        username: payload.username.value,
        email: payload.email.value
      }, {
        expiresIn: this.configService.get('jwt_access_token_expires_time'),
      })

      const refresh_token = this.jwtService.sign({
        sub: payload.sub,
        username: payload.username.value,
        email: payload.email.value,
      }, {
        expiresIn: this.configService.get('jwt_refresh_token_expires_time'),
      })

      return {
        access_token,
        refresh_token
      }
    } catch (err) {
      throw new UnauthorizedException('token已失效，请重新登录')
    }
  }
}