import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScraperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
