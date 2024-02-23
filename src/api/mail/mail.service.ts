import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(email: string, code : string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '[Ducademi]이메일 인증',
        text: code,
      });
    } catch (err) {
      Logger.error(err);
      throw new Error('이메일 전송 실패');
    }
  }
}
