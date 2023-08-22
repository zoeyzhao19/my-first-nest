import { IRequest, ResponseFlags } from "@libs/mediator";
import { GetUserQueryResponse } from "./GetUsersQueryResponse";

export class GetUserQuery implements IRequest<GetUserQueryResponse> {
  [ResponseFlags]: GetUserQueryResponse

  username: string;

  email: string;

  nickname: string;

  pageNum: number;

  pageSize: number;

  constructor(username: string, email: string, nickname: string, pageNum: number, pageSize: number) {
    this.username = username
    this.email = email
    this.nickname = nickname
    this.pageNum = pageNum
    this.pageSize = pageSize
  }
}