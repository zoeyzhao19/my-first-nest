import { IRequest, ResponseFlags } from "@libs/mediator";

export class RegisterCommand implements IRequest<void> {
  [ResponseFlags]: void;

  username: string;
  password: string;
  email: string;
  nickname:string;

  constructor({username, password, email, nickname}: {username: string, password: string, email: string, nickname:string}) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.nickname = nickname;
  }

}