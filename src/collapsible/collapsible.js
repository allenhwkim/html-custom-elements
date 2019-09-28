import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import css from './collapsible.css';

export class HCECollapsible extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(null, css).then((_) => {
      this.init();
    });
  }

  init() {
    Array.from(this.querySelectorAll('.hce-header')).forEach(header => {
      header.setAttribute('tabindex', 0);
      header.addEventListener('click', this.toggleBody);
      header.addEventListener('keydown', this.toggleBody);
    });
  }

  toggleBody(event) {
    if (this.keyCode && this.keyCode !== 32) {
      return;
    }

    const headerEl = event.target.closest('.hce-header');
    const thisParent = headerEl.parentElement;
    const AllExpandedParents = headerEl.closest('.hce').querySelectorAll('.expanded');

    // collapse all other tabs except this one, then toggle expanded
    Array.from(AllExpandedParents)
        .filter(el => !el.isEqualNode(thisParent))
        .forEach(el => el.classList.remove('expanded'));
    thisParent.classList.toggle('expanded');
  }
}

HCECollapsible.define('hce-collapsible', HCECollapsible);
