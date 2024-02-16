import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyBoard } from './entity/study-board.entity';
import { Repository } from 'typeorm';
import { StudyCreateDto } from './dto/create.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class StudyBoardService {
  constructor(
    @InjectRepository(StudyBoard)
    private readonly studyRepository: Repository<StudyBoard>,
  ) {}

  public async create(user : User,studyCreateDto: StudyCreateDto): Promise<StudyBoard> {
    const studyBoard : any = {
        title : studyCreateDto.title,
        description : studyCreateDto.description,
        maxmember : studyCreateDto.maxmember,
        recommendtarget : studyCreateDto.recommendtarget,
        userId : user.userId
    }
    return await this.studyRepository.save(studyBoard);
  }
}
