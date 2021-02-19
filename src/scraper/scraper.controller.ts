import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ScrapingDto } from './dto/scraping.dto';

@Controller()
export class ScraperController {
  @MessagePattern('linkedin.scraper')
  async scrape(@Payload() payload: ScrapingDto) {
    return;
  }
}
