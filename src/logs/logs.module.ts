/**
 * 日志模块
 * 提供应用程序的日志记录功能，支持控制台输出和文件日志记录
 * 使用 Winston 日志库和每日轮转文件传输器
 */
import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { Console } from 'winston/lib/winston/transports';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { LogsEnum } from 'types/config.enum';

@Module({
  imports: [
    // 配置 Winston 日志模块
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 控制台日志传输器配置
        const consoleTransports = new Console({
          level: configService.get(LogsEnum.LOG_LEVEL), // 日志级别：info 及以上级别会输出到控制台
          format: winston.format.combine(
            winston.format.timestamp(), // 添加时间戳
            utilities.format.nestLike(), // 使用 NestJS 风格的日志格式
          ),
        });

        // 日志文件目录路径
        const logs = path.join(process.cwd(), 'logFile');

        // 应用日志文件传输器配置（记录所有 info 级别及以上的日志）
        const appFileTransports = new DailyRotateFile({
          level: 'info', // 日志级别：info 及以上级别会写入文件
          dirname: logs, // 日志文件存储目录
          filename: 'info-%DATE%.log', // 文件名模板，%DATE% 会被替换为日期
          datePattern: 'YYYY-MM-DD', // 日期格式，用于文件名和日志轮转
          zippedArchive: true, // 启用旧日志文件的压缩
          maxSize: '20m', // 单个日志文件最大大小为 20MB
          maxFiles: '14d', // 保留 14 天的日志文件
          format: winston.format.combine(
            winston.format.timestamp(), // 添加时间戳
            winston.format.simple(), // 使用简单格式输出
          ),
        });

        // 错误日志文件传输器配置（仅记录 error 级别日志）
        const errorFileTransports = new DailyRotateFile({
          level: 'error', // 日志级别：仅 error 级别会写入此文件
          dirname: logs, // 日志文件存储目录
          filename: 'error-%DATE%.log', // 文件名模板，%DATE% 会被替换为日期
          datePattern: 'YYYY-MM-DD', // 日期格式，用于文件名和日志轮转
          zippedArchive: true, // 启用旧日志文件的压缩
          maxSize: '20m', // 单个日志文件最大大小为 20MB
          maxFiles: '14d', // 保留 14 天的日志文件
          format: winston.format.combine(
            winston.format.timestamp(), // 添加时间戳
            winston.format.simple(), // 使用简单格式输出
          ),
        });

        // 日志开关控制：通过环境变量 LOG_ON 控制是否启用文件日志
        // 默认启用（LOG_ON 不等于 'false' 时启用）
        const logOn = configService.get(LogsEnum.LOG_ON) === 'true';
        // 返回日志传输器配置
        return {
          transports: [
            consoleTransports, // 始终启用控制台输出
            ...(logOn ? [appFileTransports, errorFileTransports] : []), // 根据配置决定是否启用文件日志
          ],
        };
      },
    }),
  ],
})
export class LogsModule {}
