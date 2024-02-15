import { Module } from '@nestjs/common';
import { MysqlConnectService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forRootAsync({
    useClass : MysqlConnectService
  })]
})
export class DbModule {}
