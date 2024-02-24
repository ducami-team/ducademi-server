import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyBoard } from './entity/study-board.entity';
import { Like, Repository } from 'typeorm';
import { StudyCreateDto } from './dto/create.dto';
import { User } from '../user/entity/user.entity';
import { StudyFixDto } from './dto/fix.dto';
import { Category } from '../category/entity/category.entity';
import { CategoryService } from '../category/category.service';
import { AwsService } from '../aws/aws.service';
import { validationData } from 'src/global/utils/validation.util';
import { UserService } from '../user/user.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class StudyBoardService {
  constructor(
    @InjectRepository(StudyBoard)
    private readonly studyRepository: Repository<StudyBoard>,
    private readonly categoryService: CategoryService,
    private readonly awsService: AwsService,
    private readonly userService: UserService,
  ) {}

  public async create(
    user: User,
    studyCreateDto: StudyCreateDto,
    file: any,
  ): Promise<StudyBoard> {
    const categories: Category[] = await this.categoryService.create(
      studyCreateDto.categoryNames,
    );

    const imageUpload: string | undefined = await this.awsService.imageUpload(
      file,
      'study',
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
      image: imageUpload ? imageUpload : undefined,
      user,
      categories,
    };
    return await this.studyRepository.save(studyBoard);
  }

  public async fix(
    studyFixDto: StudyFixDto,
    studyId: number,
    user: User,
    file: any,
  ): Promise<StudyBoard> {
    const study = await this.findStudyBoardById(studyId);
    if (validationData(study)) {
      throw new NotFoundException('존재하지 않는 강의 입니다.');
    }

    await this.userService.verifyUser(user.id, study.user.id);
    const imageUpload: string | undefined = await this.awsService.imageUpload(
      file,
      'study',
    );
    const categories = await this.categoryService.create(
      studyFixDto.categoryNames,
    );

    const fixedStudy: any = await this.studyRepository.update(+studyId, {
      title: studyFixDto.title,
      description: studyFixDto.description,
      maxmember: +studyFixDto.maxmember,
      recommendtarget: studyFixDto.recommendtarget,
      studyStartDate: studyFixDto.studyStartDate,
      studyEndDate: studyFixDto.studyEndDate,
      image: imageUpload,
    });
    await this.studyRepository
      .createQueryBuilder()
      .relation(StudyBoard, 'categories')
      .of(studyId)
      .addAndRemove(categories, study.categories);
    return fixedStudy;
  }

  public async studyFire(user: User, studyId: number): Promise<void> {
    const study = await this.findStudyBoardById(studyId);
    if (validationData(study)) {
      throw new NotFoundException('존재하지 않는 강의 입니다.');
    }
    await this.userService.verifyUser(user.id, study.user.id);
    await this.studyRepository.delete(study.id);
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

  public async findStudyBoardById(studyId: number): Promise<StudyBoard> {
    const studyBoard: StudyBoard = await this.studyRepository.findOne({
      where: {
        id: studyId,
      },
      relations: ['user', 'categories'],
    });
    if (validationData(studyBoard)) {
      throw new NotFoundException('존재하지 않는 강의 입니다.');
    }
    return studyBoard;
  }

  public async searchStudy(searchDto: SearchDto): Promise<StudyBoard[]> {
    const { title, category } = searchDto;
    const query = this.studyRepository.createQueryBuilder('study');
    if (searchDto.title) {
      query.where('study.title LIKE :title', { title: `%${title}%` });
    }

    if (category) {
      if (Array.isArray(category)) {
        if (category.length > 0) {
          query
            .leftJoinAndSelect('study.categories', 'category')
            .andWhere('category.name IN (:...category)', { category });
        }
      } else {
        query
          .leftJoinAndSelect('study.categories', 'category')
          .andWhere('category.name = :category', { category });
      }
    }
    const studyBoards: StudyBoard[] = await query.getMany();
    if (validationData(studyBoards[0])) {
      throw new NotFoundException('검색 결과가 없습니다.');
    }
    return studyBoards;
  }
}
