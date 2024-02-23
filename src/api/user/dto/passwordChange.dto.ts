import { IsNotEmpty, IsString } from "class-validator";


export class PasswordChangeDto{
    @IsNotEmpty()
    @IsString()
    email : string;
    
    @IsNotEmpty()
    @IsString()
    newPassword : string;

}