import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ScrapingDto } from './dto/scraping.dto';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @MessagePattern('scrape')
  async scrape(@Payload() payload: ScrapingDto) {
    const res = await this.scraperService.scrape(payload);
    return res;
  }
}
