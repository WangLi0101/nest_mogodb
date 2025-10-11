import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const vo = this.reflector.get('response-vo', context.getHandler());
    return next.handle().pipe(
      map((data) => {
        if (vo) {
          data = plainToInstance(vo, data, {
            excludeExtraneousValues: true,
          });
        }
        return {
          code: 0,
          message: 'success',
          data,
        };
      }),
    );
  }
}
