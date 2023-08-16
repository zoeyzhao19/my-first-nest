import { IRequest, ResponseFlags } from "@libs/mediator";
import { LoginCommandResponse } from "./LoginCommandResponse";

export class LoginCommand implements IRequest<LoginCommandResponse> {
  [ResponseFlags]: LoginCommandResponse;

  username: string;

  password: string;

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}