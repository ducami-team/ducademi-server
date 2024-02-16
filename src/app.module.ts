import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './api/user/user.module';
import { StudyBoardModule } from './api/study-board/study-board.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    UserModule,
    StudyBoardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
