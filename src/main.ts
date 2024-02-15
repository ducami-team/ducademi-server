import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get('PORT');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();


  await app.listen(8080);
  Logger.log(`Application runnig on : ${await app.getUrl()}`);
}
bootstrap();
