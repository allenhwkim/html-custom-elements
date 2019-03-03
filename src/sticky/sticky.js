import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';

function __setParentPositioned(el) {
  const parentElPosition =
    window.getComputedStyle(el.parentElement).getPropertyValue('position');
  if (!['absolute', 'fixed', 'relative'].includes(parentElPosition)) {
    el.parentElement.style.position = 'relative';
  }
}

function __isInView(el, offset = 0) {
  const bcr = el.getBoundingClientRect();
  const top = bcr.top - offset >= 0;
  const bottom = bcr.bottom <= window.innerHeight;
  const left = bcr.left >= 0;
  const right = bcr.right <= window.innerWidth;
  // console.log(offset, top, right, bottom, left);
  return (top && bottom && left && right);
}

function __createSpacer(stickyEl) {
  const elStyle = window.getComputedStyle(stickyEl);
  const elProp = (prop) => elStyle.getPropertyValue(prop);
  const spacerEl = document.createElement('div');
  spacerEl.setAttribute('style',
      `display: ${elProp('display')}; background: #CCC;` +
    `width: ${elProp('width')}; height:${elProp('height')};` +
    `float: ${elProp('float')};` +
    `margin: ${elProp('margin-top')} ${elProp('margin-right')}` +
    `  ${elProp('margin-bottom')} ${elProp('margin-left')};`);
  stickyEl.insertAdjacentElement('beforebegin', spacerEl);
  return spacerEl;
}

export class HCESticky extends HTMLCustomElement {
  // offset;

  connectedCallback() {
    __setParentPositioned(this);
    this.style.boxSizing = 'border-box';
    this.style.margin='0'; // ignore margin, which makes it complicated
    this.spacer = __createSpacer(this);
    this.style.display= this.spacer.style.display; // ignore margin, which makes it complicated
    this.style.top = this.spacer.offsetTop + 'px';
    this.style.left = this.spacer.offsetLeft + 'px';
    this.style.position = 'absolute';
    this.renderWith().then(_ => {
      window.addEventListener('scroll', this.windowScrollHandler.bind(this));
      window.addEventListener('resize', this.windowScrollHandler.bind(this));
    });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.windowScrollHandler.bind(this));
    window.removeEventListener('resize', this.windowScrollHandler.bind(this));
  }

  windowScrollHandler(event) {
    if (__isInView(this.spacer, this.offset)) {
      this.style.top = this.spacer.offsetTop + 'px';
      this.style.left = this.spacer.offsetLeft + 'px';
      this.style.width= this.spacer.offsetWidth + 'px';
      this.classList.remove('detached');
    } else {
      const marginTop = this.offset || 0;
      const pBcr = this.parentElement.getBoundingClientRect();
      const maxTop = pBcr.height - this.spacer.offsetHeight;
      // console.log('pBcr.top', pBcr.top, 'this.apacer.offsetTop', 'marginTop', this.spacer.offsetTop, marginTop);
      // console.log('pBcr.top + this.spacer.offsetTop', pBcr.top + this.spacer.offsetTop );
      if (pBcr.top + this.spacer.offsetTop - marginTop < 0) {
        this.style.top = Math.min((pBcr.top * -1 + marginTop), maxTop) + 'px';
      }
      this.classList.add('detached');
    }
  }
}

HCESticky.define('hce-sticky', HCESticky);
