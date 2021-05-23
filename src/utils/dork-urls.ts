import { ScrapingDto } from 'src/scraper/dto/scraping.dto';

import defaultDomains from './domains';

export default (payload: ScrapingDto): string[] => {
  const { jobTitles, domains, country } = payload;

  const mailDomains = domains ?? defaultDomains;

  const jobs = jobTitles
    .reduce((pval, cval) => {
      pval += ` "${cval}"`;
      return pval;
    }, '')
    .trim();

  const urls = mailDomains.map(
    (domain) =>
      `https://www.google.com/search?q=${jobs} AND "${domain}" AND ${country}`,
  );

  // const urls = `https://www.google.com/search?q=${jobs} AND (${mailDomains
  //   .map((e) => `"${e}"`)
  //   .join('|')}) AND ${country}`;

  return urls;
};
