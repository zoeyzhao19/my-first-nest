import { IRequest, ResponseFlags } from "@libs/mediator";

export class SendCaptchaCommand implements IRequest<void> {
  [ResponseFlags]: void;

  email: string;

  constructor(email: string) {
    this.email = email;
  }

}