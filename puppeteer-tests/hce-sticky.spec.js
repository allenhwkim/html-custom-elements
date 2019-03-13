const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-sticky', () => {
  let browser, page, errors = [], I;

  beforeAll(async done => {
    browser = await puppeteer.launch(launch);
    page = (await browser.pages())[0];
    page.on('pageerror', err => errors.push(err));
    page.on('error', err => errors.push(err));

    I = new HelperI(page);
    await page.goto(baseUrl + '/#sticky', {waitUntil: 'networkidle2'});
    done();
  });

  it('hce-sticky', async done => {
    await page.evaluate(_ => window.scrollBy(0, document.body.scrollHeight));
    const leftTop = await page.$eval('hce-sticky.left', el => el.style.top);
    const middleTop = await page.$eval('hce-sticky.middle', el => el.style.top);
    const rightTop = await page.$eval('hce-sticky.right', el => el.style.top);

    expect(leftTop).toEqual(middleTop);
    expect(leftTop).toEqual(rightTop);
    done();
  });


  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
