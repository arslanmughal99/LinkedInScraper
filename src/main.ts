import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: 'scraper',
        replyQueue: 'scraper_result',
        urls: ['amqp://admin:admin@192.168.1.5:5672 '],
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
