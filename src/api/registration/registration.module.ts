import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { StudyBoardModule } from '../study-board/study-board.module';

@Module({
  imports : [TypeOrmModule.forFeature([Registration]), UserModule, TokenModule, StudyBoardModule],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
