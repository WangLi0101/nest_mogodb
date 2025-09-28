import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const payload = exception.getResponse();

    if (typeof payload === 'string') {
      response.status(status).json({
        code: status,
        message: payload,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    } else {
      const { message } = payload;
      response.status(status).json({
        code: status,
        ...payload,
        message: message.toString(),
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
