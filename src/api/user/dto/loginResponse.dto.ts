export class LoginResponseDto{
    status : number;
    message : string;

    token : string;
    refreshToken : string;

    constructor(status : number, message : string, token : string, refreshToken : string){
        this.status = status,
        this.message = message,
        this.token = token,
        this.refreshToken = refreshToken
    }
}