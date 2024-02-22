import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { StudyBoardService } from '../study-board/study-board.service';
import { User } from '../user/entity/user.entity';
import { StudyBoard } from '../study-board/entity/study-board.entity';
import { validationData } from 'src/global/utils/validation.util';
import { Registration } from './entity/registration.entity';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    private readonly userService: UserService,
    private readonly studyBoardSerice: StudyBoardService,
  ) {}
  public async registrationStudy(
    user: User,
    studyId: number,
  ): Promise<Registration> {
    const findUser: User | undefined = await this.userService.findByUserId(
      user.userId,
    );
    const studyBoard: StudyBoard | undefined =
      await this.studyBoardSerice.findStudyBoardById(studyId);
    if (validationData(findUser)) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const existringRegistration: Registration | undefined =
      await this.registrationRepository.findOne({
        where: { user: { id: user.id }, study: { id: studyBoard.id } },
      });

    if (!validationData(existringRegistration)) {
      throw new BadRequestException('이미 신청한 강의 입니다.');
    }

    const registration: any = {
      user,
      study: studyBoard,
    };

    return await this.registrationRepository.save(registration);
  }

  public async myRegistration(user: User): Promise<StudyBoard[]> {
    const registrations = await this.registrationRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'study'],
    });
    
    const studyBoards = Promise.all(
      registrations.map(async (registration) => {
        let studyBoard = await this.studyBoardSerice.findStudyBoardById(
          registration.study.id,
        );
        return studyBoard;
        
      }),
    );
    return studyBoards;
  }
}
