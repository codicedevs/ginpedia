import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ParseWhereInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.query.where) {
      request.query.where = JSON.parse(request.query.where.toString());
    }
    if (request.query.order) {
      request.query.order = JSON.parse(request.query.order.toString());
    }
    return next.handle();
  }
}
