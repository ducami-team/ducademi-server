import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { validationData } from 'src/global/utils/validation.util';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly tokenService : TokenService
  ) {}
  public async signUp(signupDto: SignUpDTO): Promise<User> {
    const user: User | undefined = await this.userRepository.findOne({
      where: {
        userId: signupDto.userId,
      },
    });
    const salt: number = +this.configService.get<number>('HASH_SALT');
    const hashedPassword: string = await bcrypt.hash(signupDto.password,salt);
    if (!validationData(user)) {
      throw new BadRequestException('중복된 아이디 입니다.');
    }
    return await this.userRepository.save({
      userId: signupDto.userId,
      password: hashedPassword,
      email: signupDto.email,
      name: signupDto.name,
      grade: signupDto.grade,
    });
  }

  public async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user: User | undefined = await this.userRepository.findOne({
      where: {
        userId: loginDto.userId,
      },
    });
    if (validationData(user)) {
      throw new BadRequestException('존재하지 않는 유저 입니다.');
    }
    const isCorrectPassworrd: boolean = bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if(!isCorrectPassworrd){
        throw new BadRequestException('옳지 않은 비밀번호입니다.');
    }
    const token : string = this.tokenService.generateAccessToken(loginDto.userId);
    const refreshToken : string = this.tokenService.generateRefreshToken(loginDto.userId);
    
    if(validationData(token)&& validationData(refreshToken)){
        throw new ForbiddenException('토큰이 발급되지 않았습니다.');
    }
    return new LoginResponseDto(HttpStatus.OK, '로그인 성공', token, refreshToken);
  }
}
