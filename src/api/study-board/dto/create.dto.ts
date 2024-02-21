import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class StudyCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  maxmember: number;

  @IsNotEmpty()
  @IsString()
  recommendtarget: string;

  @IsArray()
  categoryNames: string[];

  applyStartDate: Date;
  applyEndDate: Date;
  studyStartDate: Date;

  studyEndDate: Date;
}
