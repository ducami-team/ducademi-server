import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class StudyCreateDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    maxmember: number;

    @IsNotEmpty()
    @IsString()
    recommendtarget: string;
    

}