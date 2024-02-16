import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyBoard } from './entity/study-board.entity';
import { Repository } from 'typeorm';
import { StudyCreateDto } from './dto/create.dto';
import { User } from '../user/entity/user.entity';
import { StudyFixDto } from './dto/fix.dto';

@Injectable()
export class StudyBoardService {
  constructor(
    @InjectRepository(StudyBoard)
    private readonly studyRepository: Repository<StudyBoard>,
  ) {}

  public async create(
    user: User,
    studyCreateDto: StudyCreateDto,
  ): Promise<StudyBoard> {
    const studyBoard: StudyBoard = {
      title: studyCreateDto.title,
      description: studyCreateDto.description,
      maxmember: studyCreateDto.maxmember,
      recommendtarget: studyCreateDto.recommendtarget,
      id: 0,
      userId : user.id
    };
    return await this.studyRepository.save(studyBoard);
  }

  public async fix(user: User, studyFixDto: StudyFixDto, studyId : number): Promise<StudyBoard> {

    const fixedStudy : any = await this.studyRepository.update(+studyId,{
        title : studyFixDto.title,
        description : studyFixDto.description,
        maxmember : studyFixDto.maxmember,
        recommendtarget : studyFixDto.recommendtarget
    });
    return fixedStudy;
  }
}
