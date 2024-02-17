import { Module } from '@nestjs/common';
import { StudyBoardController } from './study-board.controller';
import { StudyBoardService } from './study-board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyBoard } from './entity/study-board.entity';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudyBoard]), UserModule, TokenModule, CategoryModule],
  controllers: [StudyBoardController],
  providers: [StudyBoardService],
})
export class StudyBoardModule {}
