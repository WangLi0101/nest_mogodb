import { HttpException, HttpStatus } from '@nestjs/common';

export enum ERROR_CODE {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
}
export const ERROR_MESSAGES: Record<ERROR_CODE, string> = {
  [ERROR_CODE.USER_NOT_FOUND]: '用户不存在',
  [ERROR_CODE.USER_ALREADY_EXISTS]: '用户已存在',
};

export class ForbiddenException extends HttpException {
  constructor(code: number, message?: string) {
    super({ code, message: message || ERROR_MESSAGES[code] }, HttpStatus.OK);
  }
}
