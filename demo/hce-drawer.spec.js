const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-drawer', () => {
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
    await page.goto(baseUrl + '/#drawer', {waitUntil: 'networkidle2'});
    done();
  });

  test('hce-drawer', async done => {
    await page.waitFor('hce-drawer', {visible: false});

    await I.clickText('Open Drawer', '#x1');
    await page.waitFor('hce-drawer', {visible: true});

    await I.click('hce-drawer .page-blocker', '#x1');
    await page.waitFor('hce-drawer', {visible: false});

    await I.clickText('Open Drawer', '#x1');
    await page.waitFor('hce-drawer', {visible: true});

    await I.click('hce-drawer .contents', '#x1');
    await page.waitFor(1000);
    await page.waitFor('hce-drawer', {visible: true});

    done();
  });

  afterAll(async () => {
    browser.close();
  });
});
