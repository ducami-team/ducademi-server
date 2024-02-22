import { IsArray, IsNumber, IsString } from "class-validator";


export class StudyFixDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  maxmember: number;


  @IsString()
  recommendtarget: string;

  @IsArray()
  categoryNames : string[];

  
  studyStartDate : Date;
  studyEndDate : Date;
}
