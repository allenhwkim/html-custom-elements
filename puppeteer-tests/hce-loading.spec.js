const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-loading', () => {
  let browser;
  let page;
  const errors = [];
  let I;

  beforeAll(async done => {
    browser = await puppeteer.launch(launch);
    page = (await browser.pages())[0];
    page.on('console', msg => console.log('[browser console]', msg.type(), msg.text()));
    page.on('pageerror', err => errors.push(err));
    page.on('error', err => errors.push(err));

    I = new HelperI(page);
    await page.goto(baseUrl + '/#loading', {waitUntil: 'networkidle2'});
    done();
  });

  test('hce-loading', async done => {
    await page.waitFor('hce-loading', {visible: false});
    await I.clickText('show loading', '#x1');
    await page.waitFor('hce-loading', {visible: true});
    await I.clickText('hide loading', '#x1');
    await page.waitFor('hce-loading', {visible: false});
    done();
  });

  afterAll(async () => {
    browser.close();
  });
});
