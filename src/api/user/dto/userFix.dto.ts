import { IsString } from 'class-validator';

export class UserFixDto {
  @IsString()
  userId: string;


  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  grade: string;
}
