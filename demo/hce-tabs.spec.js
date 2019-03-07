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
    await page.goto('http://localhost:8080/#tabs', {waitUntil: 'networkidle0'});
    done();
  });

  test('hce-tabs', async done => {
    await I.click('[tab-for=css]', '#x1');
    await I.see('Cascading Style Sheet', '#x1');
    await I.dontSee('HTML5', '#x1');
    await I.click('[tab-for=js]', '#x1');
    await I.dontSee('Cascading Style Sheet', '#x1');
    await I.see('Javascript', '#x1');
    await I.click('[tab-for=html]', '#x1');
    await I.see('HTML5', '#x1');
    await I.dontSee('Javascript', '#x1');
    done();
  });

  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
