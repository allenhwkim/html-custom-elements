const puppeteer = require('puppeteer');
const HelperI = require('./helper-i');

describe('hce-calendear', () => {
  let browser;
  let page;
  const errors = [];
  let I;

  beforeAll(async done => {
    browser = await puppeteer.launch({headless: true});
    page = (await browser.pages())[0];
    page.on('console', msg => console.log('[browser console]', msg.type(), msg.text()));
    page.on('pageerror', err => errors.push(err));
    page.on('error', err => errors.push(err));

    I = new HelperI(page);
    await page.goto('http://localhost:8080/#loading', {waitUntil: 'networkidle0'});
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
