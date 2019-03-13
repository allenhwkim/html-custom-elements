const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-calendear', () => {
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
    await page.goto(baseUrl + '/#calendar', {waitUntil: 'networkidle2'});
    done();
  });

  test('Calendar as a section with min date and max date', async done => {
    await I.click('.title .prev', '#x1');
    await I.see('May', '#x1');
    await I.click('.title .prev', '#x1');
    await I.see('May', '#x1');
    await I.click('.title .next', '#x1');
    await I.see('June', '#x1');
    await I.click('.title .next', '#x1');
    await I.see('July', '#x1');
    await I.click('.title .next', '#x1');
    await I.see('July', '#x1');
    done();
  });


  test('Calendar as a dropdown', async done => {
    await page.waitFor('#x2 hce-calendar', {visible: false});
    await page.focus('#x2 input');
    await page.waitFor('#x2 hce-calendar', {visible: true});
    await page.select('#x2 .month', '7');
    await page.select('#x2 .year', '2020');
    await I.click('.dates button:nth-child(23)', '#x2');
    await page.waitFor('#x2 hce-calendar', {visible: false});
    await page.waitForFunction(`document.querySelector('#x2 input').value === 'August 15, 2020'`);
    done();
  });

  afterAll(async () => {
    browser.close();
  });
});
