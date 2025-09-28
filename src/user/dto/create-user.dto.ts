import { Exclude } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

export class CreateUserResponseDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  @Exclude()
  breed: string;
}
