import {
  Ctx,
  Payload,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { ScrapingDto } from './dto/scraping.dto';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @MessagePattern('scrape')
  async scrape(@Payload() payload: ScrapingDto, @Ctx() context: RmqContext) {
    const res = await this.scraperService.scrape(payload, context);
    return res;
  }
}
