// import * as fs from 'fs';
import { uniq } from 'lodash';
import { parse } from 'fast-html-parser';
import { RmqContext } from '@nestjs/microservices';
import { HttpService, Injectable, Logger } from '@nestjs/common';

import getUrls from '../utils/dork-urls';
import { EMAIL_REGIX } from '../constants';
import { ScrapingDto } from './dto/scraping.dto';
import { ResultsQueueService } from './results-queue.service';

@Injectable()
export class ScraperService {
  private readonly logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly resultQueue: ResultsQueueService,
  ) {
    this.logger = new Logger('ScraperService');
    // this.mock();
  }

  /**
   * @param payload Message payload with scraping customization
   * @description scrape emails from linkedin with given message payload
   */
  async scrape(payload: ScrapingDto, context: RmqContext) {
    this.logger.debug(payload);

    const { id } = payload;
    let { limit } = payload;

    limit = limit ?? 10000;

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

        if (!gotMails && body.includes('- did not match any documents.')) {
          this.logger.verbose(
            `No more pages found. Switching Google Dork Query.`,
          );
          page = 0;
          break;
        }

        if (gotMails)
          emails = uniq(
            emails.concat(gotMails.map((mail) => mail.toLowerCase())),
          );

        this.logger.verbose(`Total emails ${emails.length}`);

        // Exit if limit reach
        if (limit && emails.length >= limit) {
          this.logger.verbose(`Limit reached now exiting.`);
          break existScraper;
        }

        page++;
      }
    }

    this.logger.verbose(`Task ${id} completed. Got ${emails.length} emails.`);
    const channel = context.getChannelRef();
    const message = context.getMessage();

    this.resultQueue.publishResults({ id, emails });
    channel.ack(message);
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

    // if (emails)
    //   fs.writeFileSync(
    //     'C:\\Users\\arsla\\Documents\\EmailScraperService\\emails',
    //     emails.join('\n') + '\n',
    //     { flag: 'a' },
    //   );

    return emails;
  }
}

// {
//   "pattern": "scrape",
//   "data": {
//     "id": "e8238788-6387-4c80-9433-f211f3a093cb",
//     "jobTitles": ["Worpdress"],
//     "limit": 1000,
//     "country": "United States"
//   }
// }
