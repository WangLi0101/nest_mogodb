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
    const dto = this.reflector.get('response-dto', context.getHandler());
    return next.handle().pipe(
      map((data) => {
        if (dto) {
          data = plainToInstance(dto, data, {
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
