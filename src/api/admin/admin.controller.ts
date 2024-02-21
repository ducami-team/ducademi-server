import { Body, Controller, Get, HttpStatus, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserRole } from 'src/global/constatnts/userRole.enum';
import { Roles } from '../../global/decorators/roles.decorator';
import RoleGuard from 'src/global/guard/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Token } from 'src/global/decorators/token.decorator';
import { User } from '../user/entity/user.entity';
import { StudyCreateDto } from '../study-board/dto/create.dto';
import BaseResponse from 'src/global/response/base.response';
import { StudyBoard } from '../study-board/entity/study-board.entity';
import { StudyBoardService } from '../study-board/study-board.service';
import TokenGuard from 'src/global/guard/token.guard';
import { StudyFixDto } from '../study-board/dto/fix.dto';
@Roles(UserRole.admin)
@UseGuards(RoleGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly studyBoardService : StudyBoardService) {}
  @Post('/create')
  @UseInterceptors( FileInterceptor('file'))
  public async create(
    @Token() user: User,
    @Body() studyCreateDto: StudyCreateDto,
    @UploadedFile() file : any
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
}
