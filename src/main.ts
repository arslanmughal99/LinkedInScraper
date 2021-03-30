import {
  Transport,
  RmqOptions,
  MicroserviceOptions,
} from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const logger = new Logger('EmailScraperService');

async function bootstrap() {
  const urls = process.env.RMQ_URLS.split(',').map((url) => url.trim());
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls,
        persistent: true,
        queue: process.env.RMQ_QUEUE_NAME,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
      logger: ['error', 'warn', 'verbose', 'log'],
    } as RmqOptions,
  );

  app.useGlobalPipes(new ValidationPipe());

  app.listen(() => {
    logger.log('Scraping service started.');
  });
}

bootstrap();
