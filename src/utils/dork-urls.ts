import { ScrapingDto } from 'src/scraper/dto/scraping.dto';

export default (payload: ScrapingDto): string[] => {
  const { jobTitle, domains } = payload;

  const mailDomains = domains ?? [
    // '@aol.com',
    // '@zoho.com',
    // '@mail.com',
    // '@live.com',
    // '@gmail.com',
    // '@yahoo.com',
    // '@icloud.com',
    // '@hotmail.com',
    // '@outlook.com',
    // '@fastmail.com',
    '@microsoft.com',
  ];

  const jobs = jobTitle
    .reduce((pval, cval) => {
      pval += ` "${cval}"`;
      return pval;
    }, '')
    .trim();

  const urls = mailDomains.map(
    (domain) => `https://www.google.com/search?q=${jobs} AND "${domain}"`,
  );

  // let url0 = `https://www.google.com/search?q="${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  // let url0 = `https://www.google.com/search?q=site:www.linkedin.com "${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  // let url1 = `https://www.google.com/search?q=site:www.linkedin.com/pub "${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  // const url2 = `https://www.google.com/search?q=site:www.linkedin.com intext:"${country}" intext:"${jobTitle}" intext:(${mailDomains})`;

  // if (location) {
  //   const loc = ` "${location}"`;

  //   url0 += loc;
  //   // url1 += loc;
  // }

  // if (include) {
  //   const inc = ` intext:(${include
  //     .map((each) => `"${each}"`)
  //     .join()
  //     .replace(/,/gm, '|')})`;

  //   url0 += inc;
  //   // url1 += inc;
  // }

  // if (exclude) {
  //   const exld = ` -intext:(${exclude
  //     .map((each) => `"${each}")`)
  //     .join()
  //     .replace(/,/gm, '|')}`;

  //   url0 += exld;
  //   // url1 += exld;
  // }

  return urls;
};
