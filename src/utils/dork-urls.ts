import { ScrapingDto } from 'src/scraper/dto/scraping.dto';

export default (payload: ScrapingDto): string[] => {
  const { jobTitles, domains } = payload;

  const mailDomains = domains ?? [
    '@aol.com',
    '@zoho.com',
    '@mail.com',
    '@live.com',
    '@gmail.com',
    '@yahoo.com',
    '@icloud.com',
    '@hotmail.com',
    '@outlook.com',
    '@fastmail.com',
    '@microsoft.com',
  ];

  const jobs = jobTitles
    .reduce((pval, cval) => {
      pval += ` "${cval}"`;
      return pval;
    }, '')
    .trim();

  const urls = mailDomains.map(
    (domain) => `https://www.google.com/search?q=${jobs} AND "${domain}"`,
  );

  return urls;
};
