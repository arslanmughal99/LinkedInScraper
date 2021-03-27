import { ScrapingDto } from 'src/scraper/dto/scraping.dto';

export default (payload: ScrapingDto): string[] => {
  const { country, jobTitle, domains, exclude, include, location } = payload;

  const mailDomains = domains
    ? domains
        .map((domain) => `"@${domain}"`)
        .join()
        .replace(/,/gm, '|')
    : '"@gmail.com" | "@hotmail.com" | "@live.com" | "@outlook.com" | "@yahoo.com" | "@mail.com" | "@icloud.com" | "@microsoft.com" | "@aol.com" | "@fastmail.com" | "@zoho.com"';

  let url0 = `https://www.google.com/search?q="Founder" "Roofing" AND "@gmail.com"`;

  // let url0 = `https://www.google.com/search?q="${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  // let url0 = `https://www.google.com/search?q=site:www.linkedin.com "${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  // let url1 = `https://www.google.com/search?q=site:www.linkedin.com/pub "${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  // const url2 = `https://www.google.com/search?q=site:www.linkedin.com intext:"${country}" intext:"${jobTitle}" intext:(${mailDomains})`;

  if (location) {
    const loc = ` "${location}"`;

    url0 += loc;
    // url1 += loc;
  }

  if (include) {
    const inc = ` intext:(${include
      .map((each) => `"${each}"`)
      .join()
      .replace(/,/gm, '|')})`;

    url0 += inc;
    // url1 += inc;
  }

  if (exclude) {
    const exld = ` -intext:(${exclude
      .map((each) => `"${each}")`)
      .join()
      .replace(/,/gm, '|')}`;

    url0 += exld;
    // url1 += exld;
  }

  return [url0];
};
