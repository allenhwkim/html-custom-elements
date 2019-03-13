const puppeteer = require('puppeteer');
const {HelperI, launch, timeout, baseUrl} = require('./helper-i');
jest.setTimeout(timeout);

describe('hce-snackbar', () => {
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
    await page.goto(baseUrl + '/#snackbar', {waitUntil: 'networkidle2'});
    done();
  });

  it('hce-snackbar', async done => {
    await page.waitFor('#x1 hce-snackbar', {visible: false});
    await page.type('#x1 input', 'Hello World', {delay: 100}); // Types slower, like a user
    await page.waitFor('#x1 hce-snackbar', {visible: true});
    await I.see('Hello World', '#x1 hce-snackbar');
    done();
  });


  afterAll(async () => {
    expect(errors.length).toBe(0);
    browser.close();
  });
});
