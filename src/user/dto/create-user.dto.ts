import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
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
}
