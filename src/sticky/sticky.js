import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

function computedStyle(el, prop) {
  return window.getComputedStyle(el).getPropertyValue(prop);
}

const css = `
  :root {position: absolute; box-sizing: border-box;}
`;

function __setParentPositioned(el) {
  let parentElPosition = computedStyle(el.parentElement, 'position');
  if (!['absolute', 'fixed', 'relative'].includes(parentElPosition)) {
    el.parentElement.style.position = 'relative';
  }
}

export class HCESticky extends HTMLCustomElement {
  connectedCallback() {
    __setParentPositioned(this);
    this.renderWith(null, css).then(_ => {
      this.bcr = this.getBoundingClientRect();
      window.addEventListener('scroll', this.windowScrollHandler.bind(this));
      window.addEventListener('resize', this.windowScrollHandler.bind(this));
    });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.windowScrollHandler.bind(this));
    window.removeEventListener('resize', this.windowScrollHandler.bind(this));
  }

  // this is the one
  windowScrollHandler(event) {
    const parentBCR = this.parentElement.getBoundingClientRect();
    const top =  parentBCR.top >= 0;
    // const left = parentBCR.left >= 0;
    // const bottom = parentBCR.bottom <=  window.innerHeight;
    // const right =  parentBCR.right <= window.innerWidth;
    // const visible = (top && bottom && left && right);

    if (!top) {
      const max = parentBCR.height - this.bcr.height;
      this.style.top =  Math.min(parentBCR.top * -1, max) + 'px';
    } else {
      this.style.top = 0;
    }
  }
}

HCESticky.define('hce-sticky', HCESticky);