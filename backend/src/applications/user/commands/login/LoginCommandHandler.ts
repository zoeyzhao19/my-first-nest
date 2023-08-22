import { IRequestHandler, CommandHandler } from "@libs/mediator";
import { LoginCommand } from "./LoginCommand";
import { JwtService } from "@nestjs/jwt";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
@CommandHandler(LoginCommand)
export class LoginCommandHandler implements IRequestHandler<LoginCommand> {

    @Inject(JwtService)
    private jwtService: JwtService

    @Inject(UserService)
    private userService: UserService

    @Inject(ConfigService)
    private configService: ConfigService

    public async handle(command: LoginCommand){
      const user = await this.userService.login(command.username, command.password)
      const payload = { sub: user.id.toString(), username: user.username, email: user.email.value };

      const access_token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('jwt_access_token_expires_time'),
      })

      const refresh_token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get('jwt_refresh_token_expires_time'),
      })

      const user_info = {
        username: user.username.value,
        email: user.email.value,
        nickname: user.nickname.value,
        headPic: user.headPic,
        isFrozen: user.isFrozen,
        isAdmin: user.isAdmin
      }

      return {
        access_token,
        refresh_token,
        user_info
      }
    }
}