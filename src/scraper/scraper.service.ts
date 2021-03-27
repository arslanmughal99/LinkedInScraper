import * as fs from 'fs';
import { uniq } from 'lodash';
import { parse } from 'fast-html-parser';
import { HttpService, Injectable, Logger } from '@nestjs/common';

import getUrls from '../utils/dork-urls';
import { EMAIL_REGIX } from '../constants';
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
    const { id } = payload;
    let { limit } = payload;

    limit = limit || 1000;

    let page = 0;
    let emails: string[] = [];
    // Scrape unit no more pages or limit reached
    const dorkUrls = getUrls(payload);

    existScraper: for (const dorkUrl of dorkUrls) {
      this.logger.verbose(`On dork url ${dorkUrl}`);

      while (true) {
        this.logger.verbose(`On page ${page}`);
        const body = await this.getBody(dorkUrl, page);

        // In case of error just leave that page and move next
        if (body === 'error') {
          page++;
          continue;
        }

        const gotMails = this.parseEmails(body);

        // if (!gotMails) {
        //   this.logger.verbose(`No mails found changing dork url now.`);
        //   page = 0;
        //   break;
        // }

        // this.logger.verbose(`Got ${gotMails.length} emails.`);

        if (gotMails)
          emails = uniq(
            emails.concat(gotMails.map((mail) => mail.toLowerCase())),
          );

        this.logger.verbose(`Total emails ${emails.length}`);

        // Exit if limit reach
        if (emails.length === limit) {
          this.logger.verbose(`Limit reached now exiting.`);
          break existScraper;
        }

        page++;
      }
    }

    return { id, emails };
  }

  /**
   *
   * @param url dork url
   */
  private async getBody(url: string, page: number): Promise<string> {
    try {
      const { data } = await this.httpService
        .get(url + `&start=${page * 10}`)
        .toPromise();

      return data.toString();
    } catch (err) {
      this.logger.error('Fail to fetch body: ', err);
      return 'error';
    }
  }

  /**
   * @param body Response HTML body
   * @description Parse emails from HTML body
   */
  private parseEmails(body: string): string[] {
    const root = parse(body);

    const emails = root
      .querySelector('#main')
      .structuredText.match(EMAIL_REGIX);

    if (emails)
      fs.writeFileSync(
        'C:\\Users\\arsla\\Documents\\EmailScraperService\\emails',
        emails.join('\n') + '\n',
        { flag: 'a' },
      );

    return emails;
  }

  /**
   * @description Temporary mock function for test
   */
  async mock() {
    const mockData: ScrapingDto = {
      id: 'd3596ee2-ba16-4556-9d6f-6438a79c33e4',
      country: 'Germany',
      jobTitle: 'Inhaber',
      include: ['Kosmetik'],
    };

    await this.scrape(mockData);
  }
}
