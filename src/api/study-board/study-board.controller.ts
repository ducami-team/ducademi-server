import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { StudyBoardService } from './study-board.service';
import { StudyCreateDto } from './dto/create.dto';
import BaseResponse from 'src/global/response/base.response';
import { StudyBoard } from './entity/study-board.entity';
import TokenGuard from 'src/global/guard/token.guard';
import { Token } from 'src/global/decorators/token.decorator';
import { User } from '../user/entity/user.entity';

@Controller('study')
export class StudyBoardController {
  constructor(private readonly studyBoardService: StudyBoardService) {}

  @Post('/create')
  @UseGuards(TokenGuard)
  public async create(
    @Token() user: User,
    @Body() studyCreateDto: StudyCreateDto,
  ): Promise<BaseResponse<void>> {
    const study: StudyBoard =
      await this.studyBoardService.create(user,studyCreateDto);
    return new BaseResponse<void>(HttpStatus.CREATED, '강의 생성 성공', undefined);
  }
}
