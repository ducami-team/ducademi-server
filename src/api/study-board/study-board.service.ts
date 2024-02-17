import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyBoard } from './entity/study-board.entity';
import { Repository } from 'typeorm';
import { StudyCreateDto } from './dto/create.dto';
import { User } from '../user/entity/user.entity';
import { StudyFixDto } from './dto/fix.dto';
import { Category } from '../category/entity/category.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class StudyBoardService {
  constructor(
    @InjectRepository(StudyBoard)
    private readonly studyRepository: Repository<StudyBoard>,
    private readonly categoryService: CategoryService,
  ) {}

  public async create(
    user: User,
    studyCreateDto: StudyCreateDto,
  ): Promise<StudyBoard> {
    const categories: Category[] = await this.categoryService.create(
      studyCreateDto.categoryNames,
    );
    const studyBoard: any = {
      title: studyCreateDto.title,
      description: studyCreateDto.description,
      maxmember: studyCreateDto.maxmember,
      recommendtarget: studyCreateDto.recommendtarget,
      studyStartDate: studyCreateDto.studyStartDate,
      studyEndDate: studyCreateDto.studyEndDate,
      applyStartDate: studyCreateDto.applyStartDate,
      applyEndDate: studyCreateDto.applyEndDate,
      user,
      categories,
    };
    return await this.studyRepository.save(studyBoard);
  }

  public async fix(
    studyFixDto: StudyFixDto,
    studyId: number,
  ): Promise<StudyBoard> {
    const fixedStudy: any = await this.studyRepository.update(+studyId, {
      title: studyFixDto.title,
      description: studyFixDto.description,
      maxmember: studyFixDto.maxmember,
      recommendtarget: studyFixDto.recommendtarget,
    });
    return fixedStudy;
  }

  public async possibleApply(): Promise<StudyBoard[]> {
    const studyBoards = this.studyRepository
      .createQueryBuilder('study')
      .where(
        'study.applyStartDate < :currentTime && study.applyEndDate > :currentTime',
        { currentTime: new Date() },
      )
      .getMany();
    return studyBoards;
  }

  public async beCreatedStudy(): Promise<StudyBoard[]> {
    const studyBoards = this.studyRepository
      .createQueryBuilder('study')
      .where('study.applyStartDate > :currentTime', { currentTime: new Date() })
      .getMany();
    return studyBoards;
  }
}
