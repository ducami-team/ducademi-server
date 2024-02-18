import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { ReissuanceDto } from './dto/token.dto';
import BaseResponse from 'src/global/response/base.response';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/refresh')
  public async accessReissuance(
    @Body() reissuanceDto: ReissuanceDto,
  ): Promise<BaseResponse<string>> {
    const token: string =
      await this.tokenService.accessTokenReissuance(reissuanceDto);
    return new BaseResponse<string>(HttpStatus.OK, '토큰 재발급 성공', token);
  }
}
