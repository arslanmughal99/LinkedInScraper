import { HttpService, Injectable, Logger } from '@nestjs/common';

import getUrls from '../utils/dork-urls';
import { ScrapingDto } from './dto/scraping.dto';

@Injectable()
export class ScraperService {
  private readonly logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger('ScraperService');
    this.mock();
  }

  /**
   * @param payload Message payload with scraping customization
   * @description scrape emails from linkedin with given message payload
   */
  async scrape(payload: ScrapingDto) {
    const dorkUrls = getUrls(payload);
    this.logger.verbose(`Generated dork urls.`);
    this.logger.log(dorkUrls[0]);
    // this.getBody(dorkUrls[0]);
  }

  private async getBody(url: string) {
    const { data } = await this.httpService.get(url).toPromise();
    this.logger.log(data);
  }

  async mock() {
    const mockData: ScrapingDto = {
      id: 'd3596ee2-ba16-4556-9d6f-6438a79c33e4',
      country: 'United States',
      jobTitle: 'IT Manager',
      include: ['Wordpress', 'Software'],
    };

    await this.scrape(mockData);
  }
}
