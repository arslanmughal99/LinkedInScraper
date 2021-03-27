import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
        queue: process.env.RMQ_QUEUE_NAME,
        replyQueue: process.env.RMQ_QUEUE_RESULT_NAME,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
      logger: ['error', 'warn', 'verbose', 'log'],
    },
  );

  app.listen(() => {
    logger.log('Scraping service started.');
  });
}

bootstrap();
