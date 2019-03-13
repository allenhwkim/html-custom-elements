const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-collapsible', () => {
  let browser;
  let page;
  const errors = [];
  let I;

  beforeAll(async done => {
    browser = await puppeteer.launch(launch);
    page = (await browser.pages())[0];
    page.on('pageerror', err => errors.push(err));
    page.on('error', err => errors.push(err));

    I = new HelperI(page);
    await page.goto(baseUrl + '/#collapsible', {waitUntil: 'networkidle2'});
    done();
  });

  it('hce-collapsible horizontal', async done => {
    await page.waitForSelector('.collapsible.horizontal.contents1', {visible: false});
    await I.click('.hce-header.header1', '#x1');
    await page.waitForSelector('.collapsible.horizontal.contents1', {visible: true});
    await I.click('.hce-header.header2', '#x1');
    await page.waitForSelector('.collapsible.horizontal.contents2', {visible: false});
    await I.click('.hce-header.header2', '#x1');
    await page.waitForSelector('.collapsible.horizontal.contents2', {visible: true});
    done();
  });

  it('hce-collapsible vertical', async done => {
    await page.waitForSelector('.collapsible.vertical.contents1', {visible: false});
    await I.click('.hce-header.header1', '#x2');
    await page.waitForSelector('.collapsible.vertical.contents1', {visible: true});
    await I.click('.hce-header.header2', '#x2');
    await page.waitForSelector('.collapsible.vertical.contents2', {visible: false});
    await I.click('.hce-header.header2', '#x2');
    await page.waitForSelector('.collapsible.vertical.contents2', {visible: true});
    done();
  });

  it('hce-carousel side bar', async done => {
    await page.waitForSelector('#x3 .hce-body', {visible: true});
    await I.click('.hce-header', '#x3');
    await page.$eval('#x3 .hce-body', el => (el.offsetWidth === 1));
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
