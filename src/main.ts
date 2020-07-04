import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { urlencoded, json } from 'express';

const allowedOrigin = [
  /http:\/\/localhost:\d+/,
  /http:\/\/127\.0\.0\.1:\d+/,
  /http:\/\/192\.168\.88\.\d+:\d+/
];

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.enableCors();
  app.enableCors({
    origin :allowedOrigin,
    credentials : true,
  })
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..' , 'files'));
  await app.listen(7000);
}
bootstrap();
