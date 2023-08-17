export interface UpdatePassRequest {
  old_password: string
  new_password: string
  captcha: string
}