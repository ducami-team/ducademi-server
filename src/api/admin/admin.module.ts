import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { StudyBoard } from '../study-board/entity/study-board.entity';
import { StudyBoardModule } from '../study-board/study-board.module';

@Module({
  imports: [TokenModule, UserModule, StudyBoardModule],
  controllers: [AdminController],
})
export class AdminModule {}
