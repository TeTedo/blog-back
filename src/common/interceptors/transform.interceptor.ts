import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Response, Request } from 'express';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        data,
        meta: {
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      })),
      catchError((error) => {
        const status = error instanceof HttpException ? error.getStatus() : 500;
        const message =
          error instanceof HttpException
            ? error.message
            : 'Internal server error';

        response.status(status);

        return new Observable<ApiResponse<T>>((subscriber) => {
          subscriber.next({
            success: false,
            error: {
              code: `ERR_${status}`,
              message,
            },
            meta: {
              timestamp: new Date().toISOString(),
              path: request.url,
            },
          });
          subscriber.complete();
        });
      }),
    );
  }
}
