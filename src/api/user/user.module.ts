import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { TokenModule } from '../token/token.module';
import { AwsModule } from '../aws/aws.module';
import { MailModule } from '../mail/mail.module';
import { VerifyCode } from './entity/verifyCode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([VerifyCode]),
    TokenModule,
    AwsModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
