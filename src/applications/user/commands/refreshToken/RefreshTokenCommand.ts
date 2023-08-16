import { IRequest, ResponseFlags } from "@libs/mediator";
import { RefreshTokenCommandResponse } from "./RefreshTokenCommandResponse";

export class RefreshTokenCommand implements IRequest<RefreshTokenCommandResponse> {
  [ResponseFlags]: RefreshTokenCommandResponse

  refresh_token: string

  constructor(refresh_token: string) {
    this.refresh_token = refresh_token
  }
}