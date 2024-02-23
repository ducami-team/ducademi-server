import { IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
