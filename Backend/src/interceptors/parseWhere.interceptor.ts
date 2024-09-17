import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ParseWhereInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    // Verifica si where es un string antes de intentar parsear
    if (request.query.where && typeof request.query.where === 'string') {
      try {
        request.query.where = JSON.parse(request.query.where);
      } catch (error) {
        throw new Error('Invalid JSON format for "where" query');
      }
    }

    // Verifica si order es un string antes de intentar parsear
    if (request.query.order && typeof request.query.order === 'string') {
      try {
        request.query.order = JSON.parse(request.query.order);
      } catch (error) {
        throw new Error('Invalid JSON format for "order" query');
      }
    }

    // Si el order ya es un objeto, asegúrate de no sobrescribirlo
    if (typeof request.query.order !== 'object' && request.query.order) {
      throw new Error('Order should be an object.');
    }

    return next.handle();
  }
}
