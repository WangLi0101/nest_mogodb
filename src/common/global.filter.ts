import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ForbiddenException } from 'src/common/error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
@Catch()
export class GlobalFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  private httpError(request: Request, response: Response, exception: any) {
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
  }
  // 其他错误
  private otherError(request: Request, response: Response, exception: any) {
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

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // http错误
    if (exception instanceof ForbiddenException) {
      this.httpError(request, response, exception);
    } else {
      // 其他错误
      this.otherError(request, response, exception);
    }
  }
}
