import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ItokenPayload } from 'src/global/interfaces/itoken-payload/itoken-payload.interface';

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
}
