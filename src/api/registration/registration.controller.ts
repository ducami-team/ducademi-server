import { Controller, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import TokenGuard from 'src/global/guard/token.guard';
import BaseResponse from 'src/global/response/base.response';
import { Registration } from './entity/registration.entity';
import { Token } from 'src/global/decorators/token.decorator';
import { User } from '../user/entity/user.entity';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/study/:id')
  @UseGuards(TokenGuard)
  public async registrationStudy(
    @Token() user: User,
    @Param('id') studyId: number,
  ): Promise<BaseResponse<Registration>> {
    const registration: Registration =
      await this.registrationService.registrationStudy(user, studyId);
    return new BaseResponse<Registration>(
      HttpStatus.OK,
      '교육 신청 성공',
      registration,
    );
  }
}
