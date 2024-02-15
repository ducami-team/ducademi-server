import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import BaseResponse from 'src/global/response/base.response';
import { SignUpDTO } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post('/signup')
    public async signUp(@Body() signupDto : SignUpDTO):Promise<BaseResponse<void>>{
        const user : User  = await this.userService.signUp(signupDto);
        return new BaseResponse<void>(HttpStatus.CREATED, '회원가입 성공', undefined);
    }

    @Post('/login')
    public async login(@Body() loginDto : LoginDto) : Promise<LoginResponseDto>{
        const loginResponse : LoginResponseDto = await this.userService.login(loginDto);
        return loginResponse;
    }

}
