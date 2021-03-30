import { HttpModule, Module } from '@nestjs/common';

import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResultsQueueService } from './results-queue.service';

@Module({
  imports: [
    HttpModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configs: ConfigService) => ({
        proxy: {
          host: configs.get('PROXY_HOST'),
          protocol: configs.get('PROXY_TYPE'),
          port: parseInt(configs.get('PROXY_PORT')),
          auth: {
            username: configs.get('PROXY_USERNAME'),
            password: configs.get('PROXY_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [ScraperService, ResultsQueueService],
  controllers: [ScraperController],
})
export class ScraperModule {}
