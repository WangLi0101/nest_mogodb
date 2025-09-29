import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { GlobalFilter } from './common/global.filter';
import { MongooseModule } from '@nestjs/mongoose';

import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    LogsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalFilter,
    },
  ],
})
export class AppModule {}
