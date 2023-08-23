import { RoomStatus } from "@shared/status";

export class GetRoomQueryResponse {
  list: {
    id: string;
    name: string;
    status: RoomStatus
  }[];
  total: number;
}