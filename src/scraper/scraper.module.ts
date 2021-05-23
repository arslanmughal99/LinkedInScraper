import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { ResultsQueueService } from './results-queue.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configs: ConfigService) => {
        return {
          timeout: 10000,
          proxy: {
            host: configs.get('PROXY_HOST'),
            port: configs.get<number>('PROXY_PORT'),
            auth: {
              username: configs.get('PROXY_USERNAME'),
              password: configs.get('PROXY_PASSWORD'),
            },
          },
        };
      },
    }),
  ],
  controllers: [ScraperController],
  providers: [ScraperService, ResultsQueueService],
})
export class ScraperModule {}
