import { IRequest, ResponseFlags } from "@libs/mediator";

export class SendCaptchaCommand implements IRequest<void> {
  [ResponseFlags]: void;

  email: string;

  captchaType: 'register' | 'update_password'

  constructor(email: string, captchaType: 'register' | 'update_password') {
    this.email = email;
    this.captchaType = captchaType 
  }

}