const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-dyn-contents', () => {
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
    await page.goto(baseUrl + '/#dyn-contents', {waitUntil: 'networkidle2'});
    done();
  });

  it('dynamic contents', async done => {
    await I.see('111111111111111');
    await I.clickText('contents 1');
    await I.see('111111111111111');
    await I.clickText('contents 2');
    await I.see('222222222222222');
    await I.dontSee('111111111111111');
    await I.clickText('contents 3');
    await I.see('333333333333333');
    await I.dontSee('222222222222222');
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
