const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-dyn-list', () => {
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
    await page.goto(baseUrl + '/#dyn-list', {waitUntil: 'networkidle2'});
    done();
  });

  it('auto complete', async done => {
    await page.type('#x0 #keyword', 'foo');
    await I.see('foo Jane Dorothy');
    await I.clickText('foo Jane Dorothy');
    await page.$eval('#x0 #keyword', el => el.value === 'foo Jane Dorothy');
    done();
  });

  it('Source As an Array', async done => {
    await I.clickText('set source2', '#x1');
    await I.see('Array 2 Dorothy');
    await I.clickText('set source1', '#x1');
    await I.see('Array 1 Dorothy');
    done();
  });

  it('Source As an Object', async done => {
    await I.clickText('set source2', '#x2');
    await I.see('2 Object 2 Dorothy');
    await I.clickText('set source1', '#x2');
    await I.see('2 Object 1 Dorothy');
    done();
  });

  it('Source As an Promise', async done => {
    await I.clickText('set source2', '#x3');
    await I.see('Promise 2 Jane Dorothy');
    await I.clickText('set source1', '#x3');
    await I.see('Promise 1 Jane Dorothy');
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
