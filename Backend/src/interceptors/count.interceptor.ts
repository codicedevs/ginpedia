import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { ConnectionSource } from "config/typeorm";
import { Request, Response } from "express";
import { map, Observable } from "rxjs";

@Injectable()
export class CountInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.method === "GET") {
      const entityName = this.getEntityNameFromRequest(request);

      if (entityName) {
        try {
          const repository = ConnectionSource.getRepository(entityName);
          const count = await repository.count();
          const range = `0-${count - 1}/${count}`; // Suponiendo que devuelves todos los resultados
          response.setHeader("Content-Range", `${entityName} ${range}`);
          response.setHeader("X-Total-Count", count);
        } catch (err) {
          console.error(err);
        }
      }
    }
    return next.handle();
  }
  private getEntityNameFromRequest(req: Request): string | null {
    const path = req.path;

    const entityMap: { [key: string]: string } = {
      "/users": "User",
      "/products": "Product",
    };
    if (path in entityMap) {
      return entityMap[path];
    }
    return null;
  }
}
