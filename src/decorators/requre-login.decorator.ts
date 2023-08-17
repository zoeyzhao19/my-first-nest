import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const RequireLogin = () => SetMetadata('REQUIRE_LOGIN', true);

export const UserInfo = createParamDecorator((data, context: ExecutionContext) => {
  const request: Request = context.switchToHttp().getRequest()

  if (!request.user) {
    return null;
  }
  return data ? request.user[data] : request.user;
})