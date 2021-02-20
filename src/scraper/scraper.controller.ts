import { Controller } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

import { ScrapingDto } from './dto/scraping.dto';
import { ScraperService } from './scraper.service';

@Controller()
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly kafkaClient: ClientKafka,
  ) {}

  @MessagePattern('linkedin.scraper')
  async scrape(@Payload() payload: ScrapingDto) {
    const res = await this.scraperService.scrape(payload);
    this.kafkaClient.emit('', res);
    return res;
  }
}
