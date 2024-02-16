import { BadRequestException, GoneException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ItokenPayload } from 'src/global/interfaces/itoken-payload/itoken-payload.interface';
import { ReissuanceDto } from './dto/token.dto';
import { Itoken } from 'src/global/interfaces/itoken/itoken.interface';
import { isDifferentUtil, isSameUtil } from 'src/global/utils/comparsion.util';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public generateAccessToken(userId: string): string {
    const payload: ItokenPayload = {
      userId,
    };
    const options: JwtSignOptions = {
      expiresIn: this.configService.get<number>('TOKEN_EXPIRED'),
      issuer: 'ducademi',
      subject: 'token',
    };
    return this.jwtService.sign(payload, options);
  }
  public generateRefreshToken(userId : string) : string{
    const payload: ItokenPayload = {
        userId,
      };
      const options: JwtSignOptions = {
        expiresIn: this.configService.get<number>('TOKEN_EXPIRED'),
        issuer: 'ducademi',
        subject: 'refreshToken',
      };
      return this.jwtService.sign(payload, options);
  }

  public async accessTokenReissuance(reissuanceDto : ReissuanceDto) : Promise<string>{
    const { iss, sub, userId } : Itoken = await this.verifyToken(
      reissuanceDto.refreshToken,
    );
    if(isDifferentUtil(iss , 'ducademi') && isSameUtil(sub, 'ducademi')){
      throw new UnauthorizedException('위조된 토큰입니다.');
    }
    return this.generateAccessToken(userId);
  }

  public async verifyToken (token : string){
    console.log(token);
    try{
      return this.jwtService.verify(token);
    }catch(err){
      switch(err.name){
        case 'jwt must be provided':
          throw new BadRequestException('다시 시도해 주세요.');
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
          throw new UnauthorizedException('위조된 토큰입니다.');
        case 'jwt expired':
          throw new GoneException('토큰이 만료되었습니다.');
        default:
          Logger.error(err);
          throw new InternalServerErrorException('다시 시도해 주세요.');
      }
    }
  }
}
