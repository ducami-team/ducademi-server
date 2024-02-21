import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudyBoardService } from './study-board.service';
import { StudyCreateDto } from './dto/create.dto';
import BaseResponse from 'src/global/response/base.response';
import { StudyBoard } from './entity/study-board.entity';
import TokenGuard from 'src/global/guard/token.guard';
import { Token } from 'src/global/decorators/token.decorator';
import { User } from '../user/entity/user.entity';
import { StudyFixDto } from './dto/fix.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile} from 'multer';

@Controller('study')
export class StudyBoardController {
  constructor(private readonly studyBoardService: StudyBoardService) {}

  @Post('/create')
  @UseGuards(TokenGuard)
  @UseInterceptors( FileInterceptor('file'))
  public async create(
    @Token() user: User,
    @Body() studyCreateDto: StudyCreateDto,
    @UploadedFile() file : MulterFile
  ): Promise<BaseResponse<void>> {
    const study: StudyBoard = await this.studyBoardService.create(
      user,
      studyCreateDto,
      file
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
    @Token() user: User,
    @Body() studyFixDto: StudyFixDto,
    @Param('id') studyId: number,
  ): Promise<BaseResponse<void>> {
    const study: StudyBoard = await this.studyBoardService.fix(
      studyFixDto,
      studyId,
    );
    return new BaseResponse<void>(HttpStatus.OK, '강의 수정 완료', undefined);
  }

  @Get('/possible')
  public async possibleStudy(): Promise<BaseResponse<StudyBoard[]>> {
    const studyBoards: StudyBoard[] =
      await this.studyBoardService.possibleApply();
    return new BaseResponse<StudyBoard[]>(
      HttpStatus.OK,
      '신청 가능한 교육 조회 성공',
      studyBoards,
    );
  }
  @Get('/soon')
  public async beCreatedStudy(): Promise<BaseResponse<StudyBoard[]>> {
    const studyBoards: StudyBoard[] =
      await this.studyBoardService.beCreatedStudy();
    return new BaseResponse<StudyBoard[]>(
      HttpStatus.OK,
      '개설 예정인 교육 조회 성공',
      studyBoards,
    );
  }
}
