import { IRequest, ResponseFlags } from "@libs/mediator";
import { GetRoomQueryResponse } from "./GtRoomQueryResponse";

export class GetRoomQuery implements IRequest<GetRoomQueryResponse> {
  [ResponseFlags]: GetRoomQueryResponse

  name: string;
  
  pageNum: number;

  pageSize: number;

  constructor(name: string, pageNum: number, pageSize: number) {
    this.name = name
    this.pageNum = pageNum
    this.pageSize = pageSize
  }
}