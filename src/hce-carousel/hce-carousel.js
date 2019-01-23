import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import css from './hce-carousel.css';


const html = `
  <div class="prev button-container">
    <button (click)="show('prev')">&lt;</button>
  </div>
  <hce-content></hce-content>
  <div class="next button-container">
    <button (click)="show('next')">&gt;</button>
  </div>

  <!-- shortcuts for each item -->
  <ul class="shortcuts"></ul>`;

function __addShortcuts(shortcutsEl, listEl) {
  for (let i=0; i < listEl.children.length; i++) {
    const liEl = listEl.children[i];
    const shortcut = document.createElement('li');
    shortcut.innerHTML = '&nbsp;';
    shortcut.setAttribute('tabindex', 0);
    shortcutsEl.appendChild(shortcut);

    shortcut.addEventListener('click', _ => this.show(i));
    shortcut.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.show(i);
      }
    });
  }
}

function __getIndex(all, item) {
  let index;
  for (let i = 0; i < all.length; i++) {
    if (all[i].isEqualNode(item)) {
      index = i;
      break;
    }
  }
  return index;
}

export class HCECarousel extends HTMLCustomElement {
  // selected                  // currently selected index
  // listEl: HTMLElement       // list to scroll
  // shortcutsEl: HTMLElement  // list of shortcuts
  // inviewEl: Element         // currently visible element
  // index: number             // currently selected index

  connectedCallback() {
    this.renderWith(html, css).then(_ => {
      this.listEl = this.querySelector('ul:not(.shortcuts), ol, .list');

      this.shortcutsEl = this.querySelector('ul.shortcuts');
      __addShortcuts.bind(this)(this.shortcutsEl, this.listEl);

      this.listEl && this.show(this.selected || 0);
    });
  }

  show(what) { // 'prev', 'next', or index
    let scrollToEl;
    if (what === 'prev') {
      scrollToEl = this.inviewEl.previousElementSibling || this.listEl.lastElementChild;
    } else if (what === 'next') {
      scrollToEl = this.inviewEl.nextElementSibling || this.listEl.firstElementChild;
    } else {
      scrollToEl = this.listEl.querySelector(`*:nth-child(${what + 1})`);
    }
    this.selected = __getIndex(this.listEl.children, scrollToEl);

    const prevTabIndexedEl = this.listEl.querySelector('[tabindex]');
    const prevActiveShortcut = this.shortcutsEl.querySelector('.active');
    const shortcutEl = this.shortcutsEl.children[this.selected];

    // show it
    scrollToEl.scrollIntoView({behavior: 'smooth'});

    // set shortcuts
    prevActiveShortcut && prevActiveShortcut.classList.remove('active');
    shortcutEl.classList.add('active');

    // set tabindex for accessibility
    prevTabIndexedEl && prevTabIndexedEl.removeAttribute('tabindex'); 
    scrollToEl.setAttribute('tabindex', 0);

    this.inviewEl = scrollToEl;
  }

}

HCECarousel.define('hce-carousel', HCECarousel);