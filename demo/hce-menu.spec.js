const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-menu', () => {
  let browser, page, errors = [], I;

  beforeAll(async done => {
    browser = await puppeteer.launch(launch);
    page = (await browser.pages())[0];
    page.on('console', msg => console.log('[browser console]', msg.type(), msg.text()));
    page.on('pageerror', err => errors.push(err));
    page.on('error', err => errors.push(err));

    I = new HelperI(page);
    await page.goto(baseUrl + '/#menu', {waitUntil: 'networkidle2'});
    done();
  });

  test('menu', async done => {
    await page.$eval('a[href="#/more"]', el => el.focus());
    await page.waitFor('a[href="#/more1"]', {visible: true});
    await page.waitFor('a[href="#/more2"]', {visible: true});

    await page.$eval('a[href="#/more1"]', el => el.focus());
    await page.waitFor('a[href="#/more11"]', {visible: true});
    await page.waitFor('a[href="#/more12"]', {visible: true});

    await page.$eval('a[href="#/more2"]', el => el.focus());
    await page.waitFor('a[href="#/more21"]', {visible: true});
    await page.waitFor('a[href="#/more22"]', {visible: true});
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
