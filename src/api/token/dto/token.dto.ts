import { IsString } from "class-validator";

export class ReissuanceDto {
    @IsString()
    refreshToken : string;
}