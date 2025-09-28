import { SetMetadata, Type } from '@nestjs/common';

export const ResponseDto = <T>(dto: Type<T>) =>
  SetMetadata('response-dto', dto);
