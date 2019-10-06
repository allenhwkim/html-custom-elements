import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import css from './dialog.css';

const html = `
  <div class="page-blocker" (click)="close()"></div>

  <div class="dialog">
    <button class="close" (click)="close()">&times;</button>
    <div class="title">{{title}}</div>
    <div class="body">
      <hce-content></hce-content>
    </div>
    <div class="actions"></div>
  </div>
`;

export class HCEDialog extends HTMLCustomElement {
  // dialogTitle
  // actions
  // contentHTML
  connectedCallback() {
    this.renderWith(html, css).then((_) => {
      // console.log(this.title, this.options);
      this.querySelector('.title').innerHTML = this.dialogTitle;
    });
  }

  open(options) {
    if (options && options.title) {
      this.dialogTitle = options.title;
      this.querySelector('.title').innerHTML = this.dialogTitle;
    }

    if (options && options.body) {
      this.contentHTML = options.body;
      this.querySelector('.body').innerHTML = this.contentHTML;
    }

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
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.classList.remove('visible');
    document.body.style.overflow = 'initial';
  }
}

HCEDialog.define('hce-dialog', HCEDialog);
