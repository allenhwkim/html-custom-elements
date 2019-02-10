import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import css from './drawer.css';

const html = `
  <div class="page-blocker"></div>
  <div class="contents"><hce-content></hce-content></div>
`;

export class HCEDrawer extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(html, css).then(_ => {
      this.querySelector('.page-blocker').addEventListener('click', _ => this.hide());
    });
  }

  show() {
    this.classList.add('visible');
  }

  hide() {
    this.classList.remove('visible');
  }

}

HCEDrawer.define('hce-drawer', HCEDrawer);