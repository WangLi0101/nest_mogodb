import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
@Catch()
export class GlobalFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // http错误
    if (exception instanceof ForbiddenException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();
      let errorPayload: any;
      if (typeof payload === 'string') {
        errorPayload = {
          code: status,
          message: payload,
          path: request.url,
          timestamp: new Date().toISOString(),
        };
      } else {
        const { message } = payload as any;
        errorPayload = {
          code: status,
          ...payload,
          message: message.toString(),
          path: request.url,
          timestamp: new Date().toISOString(),
        };
      }
      this.logger.error({
        url: request.url,
        method: request.method,
        body: request.body,
        ...errorPayload,
      });
      response.status(status).json(errorPayload);
    } else {
      // 其他错误
      const errorPayload = {
        code: 500,
        ...exception,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
      this.logger.error({
        url: request.url,
        method: request.method,
        body: request.body,
        ...errorPayload,
      });
      response.status(500).json(errorPayload);
    }
  }
}
