import { HttpModule, Module } from '@nestjs/common';

import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';

@Module({
  imports: [
    HttpModule,
    // HttpModule.registerAsync({
    //   useFactory: () => ({
    //     proxy: {
    //       host: process.env.PROXY_HOST,
    //       protocol: process.env.PROXY_TYPE,
    //       port: parseInt(process.env.PROXY_PORT),
    //       auth: {
    //         username: process.env.PROXY_USERNAME,
    //         password: process.env.PROXY_PASSWORD,
    //       },
    //     },
    //   }),
    // }),
  ],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
