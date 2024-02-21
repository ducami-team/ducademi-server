import {
  Body,
  Controller,
  Delete,
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
  @Get('/detail/:id')
  public async studyDetail(@Param('id') studyId : number): Promise<BaseResponse<StudyBoard>>{
    const studyBoard : StudyBoard = await this.studyBoardService.findStudyBoardById(studyId);
    return new BaseResponse<StudyBoard>(HttpStatus.OK, '강의 상세보기 조회 성공',studyBoard);
  }



  
}
