import { SetMetadata, Type } from '@nestjs/common';

export const ResponseVo = <T>(vo: Type<T>) => SetMetadata('response-vo', vo);
