import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { StudyBoardService } from '../study-board/study-board.service';
import { User } from '../user/entity/user.entity';
import { StudyBoard } from '../study-board/entity/study-board.entity';
import { validationData } from 'src/global/utils/validation.util';

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
    if (validationData(findUser) || validationData(studyBoard)) {
      throw new NotFoundException('사용자 또는 강의를 찾을 수 없습니다.');
    }
    const existringRegistration: Registration | undefined =
      await this.registrationRepository.findOne({
        where: { user: user, study: studyBoard },
      });

    if (!validationData(existringRegistration)) {
      throw new Error('이미 해당 이벤트에 신청 되어 있습니다.');
    }

    const registration: any = {
      user,
      study: studyBoard,
    };

    return await this.registrationRepository.save(registration);
  }
}
