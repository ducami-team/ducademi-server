import {
    BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import BaseResponse from 'src/global/response/base.response';
import { SignUpDTO } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import TokenGuard from 'src/global/guard/token.guard';
import { Token } from 'src/global/decorators/token.decorator';
import { UserFixDto } from './dto/userFix.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from '../mail/mail.service';
import { EmailDto } from '../mail/dto/mail.dto';
import { PasswordChangeDto } from './dto/passwordChange.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('/signup')
  public async signUp(
    @Body() signupDto: SignUpDTO,
  ): Promise<BaseResponse<void>> {
    const user: User = await this.userService.signUp(signupDto);
    return new BaseResponse<void>(
      HttpStatus.CREATED,
      '회원가입 성공',
      undefined,
    );
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const loginResponse: LoginResponseDto =
      await this.userService.login(loginDto);
    return loginResponse;
  }

  @Get('/mypage')
  @UseGuards(TokenGuard)
  public async myPage(@Token() user: User): Promise<BaseResponse<User>> {
    const myUser: User = await this.userService.findByUserId(user.userId);
    return new BaseResponse<User>(
      HttpStatus.OK,
      '마이 페이지 조회 성공',
      myUser,
    );
  }

  @Patch('/fix')
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async fix(
    @Token() user: User,
    @Body() userFixDto: UserFixDto,
    @UploadedFile() file: any,
  ): Promise<BaseResponse<User>> {
    const fixedUser: any = await this.userService.fixUser(
      user,
      userFixDto,
      file,
    );
    return new BaseResponse<User>(
      HttpStatus.OK,
      '회원정보 수정 성공',
      fixedUser,
    );
  }

  @Post('/mail')
  public async sendMail(@Body() emailDto: EmailDto): Promise<BaseResponse<void>> {
    const user : User = await this.userService.findByEmail(emailDto.email);
    const code : string = await this.userService.generateVerifycationCode(user);
    await this.mailService.sendEmail(emailDto.email, code);

    return new BaseResponse<void>(
      HttpStatus.OK,
      '이메일이 전송되었습니다.',
      undefined,
    );
  }

  @Post('/verify-code')
  public async verifyCode(@Body() body : {email : string, code : string}):Promise<BaseResponse<void>>{
    const user : User = await this.userService.findByEmail(body.email);
    const isValidCode : boolean= await this.userService.verifyCode(user.id, body.code);

    if(!isValidCode){
        throw new BadRequestException('코드가 다릅니다.');
    }
    return new BaseResponse<void>(HttpStatus.OK, '코드 인증 성공', undefined);


  }

  @Patch('/newpassword')
  public async changePassword(@Body() passwordChangeDto : PasswordChangeDto) : Promise<BaseResponse<void>>{
    const user : User = await this.userService.findByEmail(passwordChangeDto.email);
    await this.userService.resetPassword(user.id, passwordChangeDto.newPassword);
    return new BaseResponse<void>(HttpStatus.OK, '비밀번호 수정 성공', undefined);
  }

  @Post('/find-id')
  public async findUserId(@Body() body : {email : string}) : Promise<BaseResponse<string>>{
    const user : User = await this.userService.findByEmail(body.email);
    return new BaseResponse<string>(HttpStatus.OK, '아이디 조회 성공', user.userId);
  }
}
