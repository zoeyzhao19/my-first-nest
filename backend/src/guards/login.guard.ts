import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

declare module 'express' {
  interface Request {
    user: {
      id: string
      email: string;
    }
  }
}


export class LoginGuard implements CanActivate {

  @Inject()
  private reflector: Reflector

  @Inject(JwtService)
  private jwtService: JwtService

  async canActivate(
    context: ExecutionContext,
  ) {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride('REQUIRE_LOGIN', [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requireLogin) {
      return true
    }

    const authorization = request.headers.authorization

    if(!authorization) {
      throw new UnauthorizedException('用户未登录')
    }

    try {
      const token = authorization.split(' ')[1]
      const payload = await this.jwtService.verifyAsync(token)

      request.user = {
        id: payload.sub,
        email: payload.email
      }

      return true
    } catch (err) {
      throw new UnauthorizedException('token 失效，请重新登录')
    }
  }
}