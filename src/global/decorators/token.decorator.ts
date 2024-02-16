import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { TokenRequest } from "../types/token.request";


export const Token = createParamDecorator(
    (data : any, context : ExecutionContext) =>{
        const request : TokenRequest = context.switchToHttp().getRequest();
        return request.user;
    }
)