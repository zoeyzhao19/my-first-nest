import { IRequest, ResponseFlags } from "@libs/mediator";

export class RegisterCommand implements IRequest<void> {
  [ResponseFlags]: void;

  username: string;
  password: string;
  email: string;
  nickname:string;
  captcha: number;

  constructor({username, password, email, nickname, captcha}: {username: string, password: string, email: string, nickname:string; captcha: number}) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.nickname = nickname;
    this.captcha = captcha
  }

}