export interface LoginCommandResponse {
  access_token: string;
  refresh_token: string;
  user_info: {
    username: string;
    email: string;
    nickname: string;
    headPic: string;
    isFrozen: boolean;
    isAdmin: boolean
  }
}