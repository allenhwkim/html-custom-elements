const puppeteer = require('puppeteer');
const HelperI = require('./helper-i');

describe('hce-dialog', () => {
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
    page.on('dialog', async dialog => await dialog.dismiss() );

    I = new HelperI(page);
    await page.goto('http://localhost:8080/#dialog', {waitUntil: 'networkidle0'});
    done();
  });

  it('hce-dialog basic dialog function test', async done => {
    await page.waitFor('#x1 hce-dialog', {visible: false});
    await I.clickText('Open Empty Dialog', '#x1');
    await page.waitFor('#x1 hce-dialog', {visible: true});
    await I.click('hce-dialog .page-blocker', '#x1');
    await page.waitFor('#x1 hce-dialog', {visible: false});
    done();
  });

  it('hce-dialog title actions', async done => {
    await page.waitFor('#x2 hce-dialog', {visible: false});
    await I.click('#x2 button:not(.close)');
    await page.waitFor('#x2 hce-dialog', {visible: true});
    await I.see('Dialog 2 Title', '#x2');
    await I.see('This is dialog 2', '#x2');
    await I.click('.close', '#x2');
    await page.waitFor('#x2 hce-dialog', {visible: false});
    done();
  });

  it('hce-dialog custom', async done => {
    await page.waitFor('#x3 hce-dialog', {visible: false});
    await I.clickText('Open Dialog With Your Own Button', '#x3');
    await page.waitFor('#x3 hce-dialog', {visible: true});
    await I.see('Dialog 3 Title', '#x3');
    await I.see('This is dialog 3', '#x3');
    await I.clickText('Custom Button', '#x3');
    await I.click('.close', '#x3');
    await page.waitFor('#x3 hce-dialog', {visible: false});
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
