import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { UserFixDto } from './dto/userFix.dto';
import { isDifferentUtil } from 'src/global/utils/comparsion.util';
import { UserRole } from 'src/global/constatnts/userRole.enum';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly awsService: AwsService,
  ) {}
  public async signUp(signupDto: SignUpDTO): Promise<User> {
    const user: User | undefined = await this.userRepository.findOne({
      where: {
        userId: signupDto.userId,
      },
    });
    const salt: number = +this.configService.get<number>('HASH_SALT');
    const hashedPassword: string = await bcrypt.hash(signupDto.password, salt);
    if (!validationData(user)) {
      throw new BadRequestException('중복된 아이디 입니다.');
    }
    return await this.userRepository.save({
      userId: signupDto.userId,
      password: hashedPassword,
      email: signupDto.email,
      name: signupDto.name,
      grade: signupDto.grade,
      //role : UserRole.admin
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
    if (!isCorrectPassworrd) {
      throw new BadRequestException('옳지 않은 비밀번호입니다.');
    }
    const token: string = this.tokenService.generateAccessToken(
      loginDto.userId,
    );
    const refreshToken: string = this.tokenService.generateRefreshToken(
      loginDto.userId,
    );

    if (validationData(token) && validationData(refreshToken)) {
      throw new ForbiddenException('토큰이 발급되지 않았습니다.');
    }
    return new LoginResponseDto(
      HttpStatus.OK,
      '로그인 성공',
      token,
      refreshToken,
    );
  }

  public async findByUserId(userId: string): Promise<User> {
    const user: User | undefined = await this.userRepository.findOne({
      where: {
        userId,
      },
    });
    if (validationData(user)) {
      throw new NotFoundException('해당 유저의 정보를 찾을 수 없습니다.');
    }
    return user;
  }

  public async fixUser(
    user: User,
    userFixDto: UserFixDto,
    file: any,
  ): Promise<User> {
    const findUser: User | undefined = await this.userRepository.findOne({
      where: { userId: userFixDto.userId },
    });
    if (
      !validationData(findUser) &&
      isDifferentUtil(user.userId, userFixDto.userId)
    ) {
      throw new BadRequestException('이미 사용중인 ID입니다.');
    }
    const imageUpload = await this.awsService.imageUpload(file, 'user');
    await this.userRepository.update(user.id, {
      userId: userFixDto.userId,
      email: userFixDto.email,
      name: userFixDto.name,
      grade: userFixDto.grade,
      image: imageUpload,
    });

    return await this.userRepository.findOne({
      where: { id: user.id },
      select: ['id', 'userId', 'email', 'name', 'grade','image'],
    });
  }

  public async verifyUser(
    loginUserId: number,
    studyMadeByUserId: number,
  ): Promise<boolean> {
    if (isDifferentUtil(loginUserId, studyMadeByUserId)) {
      throw new UnauthorizedException('본인에 강의만 수정 할 수 있습니다.');
    }
    return true;
  }
}
