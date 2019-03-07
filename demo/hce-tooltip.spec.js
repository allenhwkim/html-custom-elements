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
    await page.goto('http://localhost:8080/#tooltipo', {waitUntil: 'networkidle0'});
    done();
  });

  test('overall', async done => {
    await I.see('tooltip on top');
    await I.see('tooltip on bottom');
    await I.see('tooltip on left');
    await I.see('tooltip on right');
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
