import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [
    JwtModule.registerAsync({
      inject : [ConfigService],
      useFactory : (configService : ConfigService)=> ({
        secret : configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports : [TokenService]
})
export class TokenModule {}
