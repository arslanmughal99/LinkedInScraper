import { ScrapingDto } from 'src/scraper/dto/scraping.dto';

export default (payload: ScrapingDto): string[] => {
  const { country, jobTitle, domains, exclude, include, location } = payload;

  const mailDomains = domains
    ? domains
        .map((domain) => `"@${domain}"`)
        .join()
        .replace(/,/gm, '|')
    : '"@gmail.com" | "@hotmail.com" | "@live.com" | "@outlook.com" | "@yahoo.com" | "@mail.com" | "@icloud.com" | "@microsoft.com" | "@aol.com" | "@fastmail.com" | "@zoho.com"';

  let url = `https://www.google.com/search?q=site:www.linkedin.com "${country}" intext:"${jobTitle}" -inurl:"dir/" intext:(${mailDomains})`;

  if (location) url += ` "${location}"`;

  if (include)
    url += ` intext:(${include
      .map((each) => `"${each}"`)
      .join()
      .replace(/,/gm, '|')})`;

  if (exclude)
    url += ` -intext:(${exclude
      .map((each) => `"${each}")`)
      .join()
      .replace(/,/gm, '|')}`;

  // const url1 = `https://www.google.com/search?q=site:www.linkedin.com "${country}" "${jobTitle}" "${location}" "${
  //   include ?? ''
  // }" intext:(${mailDomains}) -inurl:"dir/" -intext:"${exclude ?? ''}`;

  // const url2 = `https://www.google.com/search?q=site:www.linkedin.com/pub "${jobTitle}" "${country.toLowerCase()}" "${
  //   include ?? ''
  // }" intext:(${mailDomains}) -inurl:"dir/" -intext:"${exclude ?? ''}"`;

  // const url3 = `https://www.google.com/search?q=site:"www.linkedin.com" "${country.toLowerCase()}" "${jobTitle}" "${
  //   location ?? ''
  // }" "${include ?? ''}" intext:(${mailDomains}) -inurl:"dir/" -intext:"${
  //   exclude ?? ''
  // }"`;

  // const url4 = `https://www.google.com/search?q=site:www.linkedin.com intext:${country.toLowerCase()} intext:${jobTitle} intext:(${mailDomains})`;

  return [url];
};
