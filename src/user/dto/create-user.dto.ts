import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { formatDate } from 'src/common/dayjs';

// 性别枚举
export enum Sex {
  MALE = 1, // 男
  FEMALE = 2, // 女
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;

  @IsInt()
  @IsOptional()
  @IsEnum(Sex)
  sex: Sex;
}

export class UserResponseDto {
  @Transform(({ obj }) => obj._id)
  @Expose()
  userId: string;

  @IsString()
  @Expose()
  name: string;

  @IsInt()
  @Expose()
  age: number;

  @IsString()
  @Expose()
  breed: string;

  @Expose()
  @Transform(({ obj }) => formatDate(obj.createdAt))
  createdAt: Date;
}
