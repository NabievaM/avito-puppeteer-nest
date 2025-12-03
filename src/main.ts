import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 4000;

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.use(express.static(join(__dirname, '..', 'public')));

  await app.listen(port);
  Logger.log(`Backend started at http://localhost:${port}`);
}
bootstrap();
