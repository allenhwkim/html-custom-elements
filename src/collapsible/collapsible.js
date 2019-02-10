import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import css from './collapsible.css';

export class HCECollapsible extends HTMLCustomElement {

  connectedCallback() {
    this.renderWith(null, css).then(_ => {
      this.init();
    });
  }

  init() {
    Array.from(this.querySelectorAll('.hce-header')).forEach(header => {
      header.setAttribute('tabindex', 0);
      header.addEventListener('click', _ => {
        header.parentElement.classList.toggle('expanded');
      })
      header.addEventListener('keydown', event => {
        if (event.keyCode === 32) {
          header.parentElement.classList.toggle('expanded');
          event.preventDefault();
        }
      });
    });
  }

}

HCECollapsible.define('hce-collapsible', HCECollapsible);