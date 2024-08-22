import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtSetting } from "settings";
import { IS_PUBLIC_KEY } from "./public";


@Injectable()
export class AuthGuard implements CanActivate { // global pasado en main
  constructor(private jwtService: JwtService,
    private reflector: Reflector,) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("missing token");
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSetting.JWT_ACCESS_SECRET, // 
      });
      request["user"] = payload;
    } catch(err) {
      throw new UnauthorizedException(err.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}