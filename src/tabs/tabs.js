import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import * as css from './tabs.css';
import {appear, disappear} from '../utils/animate';

function __keydownHandler(e) {
  const propName =
    e.key === 'ArrowRight' ? 'nextElementSibling' :
    e.key === 'ArrowLeft' ? 'previousElementSibling' : 'N/A';

  let nextEl = e.target[propName];
  while (nextEl) {
    if (nextEl.getAttribute('disabled') === null) break;
    nextEl = nextEl[propName];
  }

  if (nextEl) {
    const tabId = nextEl.getAttribute('tab');
    this.select(tabId); // select tab and contents
  }
}

function __clickHandler(e) {
  const tabId = e.target.getAttribute('tab');
  this.select(tabId); // select tab and contents
}

class HCETabs extends HTMLCustomElement {
  // tabEls: tab index elements with attribute 'tab'
  // contentEls: tab contents elements with attribute 'tab'

  connectedCallback() {
    this.tabEls = this.querySelectorAll('.hce-tabs [tab]');
    this.contentEls = this.querySelectorAll('.hce-contents [tab]');

    this.renderWith(null, css).then(() => {
      this.select();
      Array.from(this.tabEls).forEach((el) => {
        el.addEventListener('click', __clickHandler.bind(this));
        el.addEventListener('keydown', __keydownHandler.bind(this));
      });
    });
  }

  select(tabId) {
    const tabEl =
      (tabId && this.querySelector(`.hce-tabs [tab=${tabId}]`)) ||
      this.querySelector('.hce-tabs [tab].selected') ||
      this.tabEls[0];

    if (tabEl.getAttribute('disabled') === null) {
      const selectedTabId = tabEl.getAttribute('tab');
      this.selectTab(selectedTabId);
      this.selectContent(selectedTabId);
    }
  }

  selectTab(tabId) {
    const selectedOne = this.querySelector(`.hce-tabs [tab=${tabId}]`) || this.tabsEls[0];
    Array.from(this.tabEls).filter((el) => !el.isEqualNode(selectedOne)).forEach((el) => {
      el.classList.remove('selected');
      el.removeAttribute('tabindex');
    });

    selectedOne.classList.add('selected');
    selectedOne.setAttribute('tabindex', '0');
    selectedOne.focus();
  }

  selectContent(tabId) {
    const selectedOne = this.querySelector(`.hce-contents [tab=${tabId}]`) || this.contentsEls[0];
    Array.from(this.contentEls).filter((el) => !el.isEqualNode(selectedOne)).forEach((el) => {
      el.classList.remove('selected');
      el.removeAttribute('tabindex');
      el.style.display = 'none';
    });

    selectedOne.classList.add('selected');
    selectedOne.setAttribute('tabindex', '0');
    appear(selectedOne);
  }
}

HTMLCustomElement.define('hce-tabs', HCETabs);
