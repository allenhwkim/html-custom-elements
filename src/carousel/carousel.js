import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import css from './carousel.css';


const html = `
  <div class="prev button-container">
    <button (click)="show(index-1)">&lt;</button>
  </div>
  <hce-content></hce-content>
  <div class="next button-container">
    <button (click)="show(index+1)">&gt;</button>
  </div>

  <!-- shortcuts for each item -->
  <ul class="shortcuts"></ul>`;

function __addShortcuts(shortcutsEl, listEl) {
  for (let i=0; i < listEl.children.length; i++) {
    const liEl = listEl.children[i];
    liEl.addEventListener('click', (_) => this.show(liEl));

    const shortcut = document.createElement('li');
    shortcut.innerHTML = '&nbsp;';
    shortcut.setAttribute('tabindex', 0);
    shortcutsEl.appendChild(shortcut);

    shortcut.addEventListener('click', (_) => this.show(i));
    shortcut.addEventListener('keydown', (event) => {
      (event.key === 'Enter') && this.show(i);
      (event.key === 'ArrowRight') && this.show(this.index+1);
      (event.key === 'ArrowLeft') && this.show(this.index-1);
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
  // selected                  // default selected index
  // listEl: HTMLElement       // list to scroll
  // shortcutsEl: HTMLElement  // list of shortcuts
  // inviewEl: Element         // currently visible element
  // index: number             // currently selected index

  connectedCallback() {
    this.renderWith(html, css).then((_) => {
      this.listEl = this.querySelector('ul:not(.shortcuts), ol, .list');
      this.listEl.classList.add('carousel-list');

      this.shortcutsEl = this.querySelector('ul.shortcuts');
      __addShortcuts.bind(this)(this.shortcutsEl, this.listEl);

      this.listEl &&
        setTimeout((_) => this.show(this.selected || 0), 1000);
    });
  }

  show(what) { // index, or element
    const prevTabIndexedEl = this.listEl.querySelector('[tabindex]');
    let scrollToEl = what;
    if (typeof what === 'number') {
      this.index = (this.listEl.children.length + what) % this.listEl.children.length;
      scrollToEl = this.listEl.children[this.index];
    }
    this.index = __getIndex(this.listEl.children, scrollToEl);
    // setTimeout(_ => scrollToEl.scrollIntoView({behavior: 'smooth'}) ); // this moves page to scroll
    this.listEl.scrollLeft = Math.max(0,
        scrollToEl.offsetLeft - ((this.listEl.offsetWidth - scrollToEl.offsetWidth) / 2)
    );

    // set shortcuts
    if (this.shortcutsEl.offsetParent) { // if visible
      const prevActiveShortcut = this.shortcutsEl.querySelector('.active');
      const shortcutEl = this.shortcutsEl.children[this.index];
      prevActiveShortcut && prevActiveShortcut.classList.remove('active');
      shortcutEl.classList.add('active');
      // shortcutEl.focus();
    }

    // set tabindex for accessibility
    prevTabIndexedEl && prevTabIndexedEl.removeAttribute('tabindex');
    scrollToEl.setAttribute('tabindex', 0);

    this.inviewEl = scrollToEl;
  }
}

HCECarousel.define('hce-carousel', HCECarousel);
