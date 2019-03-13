const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-tooltip', () => {
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
    await page.goto(baseUrl + '/#tooltipo', {waitUntil: 'networkidle2'});
    done();
  });

  test('overall', async done => {
    await page.$eval('#x1', el => el.focus());
    await page.waitFor('#x1 hce-tooltip', {visible: true});

    await page.$eval('#x2', el => el.focus());
    await page.waitFor('#x2 hce-tooltip', {visible: true});
    await page.waitFor('#x1 hce-tooltip', {visible: false});

    await page.$eval('#x3', el => el.focus());
    await page.waitFor('#x3 hce-tooltip', {visible: true});
    await page.waitFor('#x2 hce-tooltip', {visible: false});

    await page.$eval('#x4', el => el.focus());
    await page.waitFor('#x4 hce-tooltip', {visible: true});
    await page.waitFor('#x3 hce-tooltip', {visible: false});

    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
