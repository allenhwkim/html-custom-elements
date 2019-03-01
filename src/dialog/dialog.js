import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import css from './dialog.css';

const html = `
  <div class="page-blocker" (click)="close()"></div>

  <div class="dialog">
    <button class="close" (click)="close()">&times;</button>
    <div class="title">{{title}}</div>
    <hce-content></hce-content>
    <div class="actions"></div>
  </div>
`;

export class HCEDialog extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(html, css).then((_) => {
      // console.log(this.title, this.options);
    });
  }

  open() {
    this.querySelector('.title').innerHTML = this.dialogTitle || '';
    if (this.actions !== undefined) {
      const actionsEl = this.querySelector('.actions');
      actionsEl.innerHTML = '';
      this.actions.forEach((action) => {
        const buttonEl = document.createElement('button');
        buttonEl.innerHTML = action.text;
        buttonEl.addEventListener('click', action.handler.bind(this));
        actionsEl.appendChild(buttonEl);
      });
    }
    this.classList.add('visible');
  }

  close() {
    this.classList.remove('visible');
  }
}

HCEDialog.define('hce-dialog', HCEDialog);
