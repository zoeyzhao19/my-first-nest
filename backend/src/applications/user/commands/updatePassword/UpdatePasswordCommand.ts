import { IRequest, ResponseFlags } from "@libs/mediator";

export class UpdatePasswordCommand implements IRequest<void> {
  [ResponseFlags]: void

  id: string;
  email: string
  old_password: string
  new_password: string
  captcha: number

  constructor({id, email, old_password, new_password, captcha}: {id: string; email: string, old_password: string; new_password: string; captcha: number}) {
    this.id = id
    this.email = email
    this.old_password = old_password
    this.new_password = new_password
    this.captcha = captcha
  }
}