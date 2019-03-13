const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-overlay', () => {
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
    await page.goto(baseUrl + '/#overlay', {waitUntil: 'networkidle2'});
    done();
  });

  test('hce-overlay', async done => {
    await page.waitFor('#x1 hce-overlay', {visible: false});
    await I.clickText('show overlay on top', '#x1');
    await page.waitFor('#x1 hce-overlay', {visible: true});

    await page.waitFor('#x2 hce-overlay', {visible: false});
    await I.clickText('show overlay on bottom', '#x2');
    await page.waitFor('#x2 hce-overlay', {visible: true});

    await page.waitFor('#x3 hce-overlay', {visible: false});
    await I.clickText('show overlay on left', '#x3');
    await page.waitFor('#x3 hce-overlay', {visible: true});

    await page.waitFor('#x4 hce-overlay', {visible: false});
    await I.clickText('show overlay on right', '#x4');
    await page.waitFor('#x4 hce-overlay', {visible: true});

    done();
  });

  afterAll(async () => {
    browser.close();
  });
});
