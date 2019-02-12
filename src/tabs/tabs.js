import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import * as css from './tabs.css';

function __select(listEls, indexEl) {
  Array.from(listEls)
    .filter(el => !el.isEqualNode(indexEl))
    .forEach(el => {
      el.classList.remove('selected');
      el.removeAttribute('tabindex');
    });

  indexEl.classList.add('selected');
  indexEl.setAttribute('tabindex', '0');
}

function __keydownHandler(e) {
  const propName =
    e.key === 'ArrowRight' ? 'nextElementSibling' :
    e.key === 'ArrowLeft' ? 'previousElementSibling' : 'N/A';

  // let nextEl = e.target[propName];
  // while (nextEl) {
  //   if (nextEl.getAttribute('disabled')) {
  //     nextEl = nextEl[propName];
  //   } else {
  //     break;
  //   }
  // }

  let nextEl = e.target[propName];
  while (nextEl) {
    if (nextEl.getAttribute('disabled') === null) break;
    nextEl = nextEl[propName];
  }

  if (nextEl) {
    const tabId = nextEl.getAttribute('tab-for');
    this.select(tabId); // select tab and contents
  }
}

function __clickHandler(e) {
  const tabId = e.target.getAttribute('tab-for');
  this.select(tabId); // select tab and contents
}

class HCETabs extends HTMLCustomElement {
  // tabEls: tab index elements with attribute 'tab-for'
  // contentEls: tab contents elements with attribute 'contents-for'

  connectedCallback() {
    this.tabEls = this.querySelectorAll('[tab-for]');
    this.contentEls = this.querySelectorAll('[contents-for]');

    this.renderWith(null, css).then(() => {
      this.select();
      Array.from(this.tabEls).forEach(el => {
        el.addEventListener('click', __clickHandler.bind(this));
        el.addEventListener('keydown', __keydownHandler.bind(this));
      });
    });
  }

  select(tabId) {
    if (!tabId) {
      const tabEl = this.querySelector('[tab-for].selected') || this.tabEls[0];
      tabId = tabEl.getAttribute('tab-for');
    } 

    const tabEl = this.querySelector(`[tab-for=${tabId}]`);
    if (tabEl.getAttribute('disabled') === null) {
      const contentEl = this.querySelector(`[contents-for=${tabId}]`);
      __select(this.tabEls, tabEl);
      tabEl.focus();
      __select(this.contentEls, contentEl);
    }
  }

}

HTMLCustomElement.define('hce-tabs', HCETabs);
