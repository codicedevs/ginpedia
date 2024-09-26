import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { UsersService } from "users/users.service";
import { Request } from "express";
import { Role } from "authorization/role.enum";

interface JWTUser {
  sub: number | string;
  username: string;
  roles: string[];
  iat: number;
  exp: number;
}

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JWTUser;
    const userId = user.sub;
    const userReq = await this.userService.findByIdOrFail(+userId);
    if (userReq.roles.includes(Role.Admin)) return true;
    const deleteUserId = request.params.id;
    // Obtener el partido de la base de datos
    const userDel = await this.userService.findByIdOrFail(+deleteUserId);
    if (!userDel) {
      throw new ForbiddenException("Usuario no encontrado");
    }
    if (userDel.id !== user.sub) {
      throw new ForbiddenException(
        "No tienes permiso para modificar este usuario"
      );
    }

    return true;
  }
}
