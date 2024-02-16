import { Body, Controller, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StudyBoardService } from './study-board.service';
import { StudyCreateDto } from './dto/create.dto';
import BaseResponse from 'src/global/response/base.response';
import { StudyBoard } from './entity/study-board.entity';
import TokenGuard from 'src/global/guard/token.guard';
import { Token } from 'src/global/decorators/token.decorator';
import { User } from '../user/entity/user.entity';
import { StudyFixDto } from './dto/fix.dto';

@Controller('study')
export class StudyBoardController {
  constructor(private readonly studyBoardService: StudyBoardService) {}

  @Post('/create')
  @UseGuards(TokenGuard)
  public async create(
    @Token() user: User,
    @Body() studyCreateDto: StudyCreateDto,
  ): Promise<BaseResponse<void>> {
    const study: StudyBoard = await this.studyBoardService.create(
      user,
      studyCreateDto,
    );
    return new BaseResponse<void>(
      HttpStatus.CREATED,
      '강의 생성 성공',
      undefined,
    );
  }

  @Patch('/fix/:id')
  @UseGuards(TokenGuard)
  public async fix(
    @Token() user : User,
    @Body() studyFixDto:StudyFixDto,
    @Param('id') studyId : number,
  ): Promise<BaseResponse<void>>{
    const study : StudyBoard = await this.studyBoardService.fix(user, studyFixDto, studyId);
    return new BaseResponse<void>(
      HttpStatus.OK,
      '강의 수정 완료',
      undefined
    )
  }
}
