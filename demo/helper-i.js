// this runs on browser, not on NodeJS
const iSee = function(selector, text, positive = true) {
  const el = document.querySelector(selector);
  if (el) {
    const canSee = el.innerText.includes(text);
    const result = positive ? canSee : !canSee;
    return result;
  }
};

// this runs on browser, not on NodeJS
const iSeeText = function(text, selector) {
  const contextNode = selector ? document.querySelector(selector) : document;
  const xpath = `//*[contains(text(), '${text}')]`;
  const nodeType = 9; // XPathResult.FIRST_ORDERED_NODE_TYPE;
  const el = document.evaluate(xpath, contextNode, null, nodeType, null).singleNodeValue;
  return el;
};

class HelperI {
  constructor(page) {
    this.page = page;
  }

  async see(text, selector) {
    selector = selector || 'body';
    return this.page.waitForFunction(iSee, {}, selector, text, true);
  }

  async dontSee(text, selector) {
    selector = selector || 'body';
    return this.page.waitForFunction(iSee, {}, selector, text, false);
  }

  async click(selector, within='') {
    const cssSelector = within ? `${within} ${selector}`: selector;
    const element = await this.page.waitForSelector(cssSelector, {visible: true});
    return await this.page.evaluate(el => el.click(), element);
  }

  async clickText(text, selector) {
    const element = await this.page.waitForFunction(iSeeText, {}, text, selector);
    return await this.page.evaluate(el => el.click(), element);
  }

  async screenshot(name) {
    await this.page.screenshot({path: `.tmp/${currentSpec}${name}.png`});
  }
}

module.exports = HelperI;
