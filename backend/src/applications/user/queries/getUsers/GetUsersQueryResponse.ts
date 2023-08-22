export class GetUserQueryResponse {
  list: {
    id: string;
    username: string;
    email: string;
    nickname: string;
    headPic: string;
    isFrozen: boolean;
    isAdmin: boolean
  }[];
  total: number;
}