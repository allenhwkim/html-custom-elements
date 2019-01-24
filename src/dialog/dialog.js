import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import css from './dialog.css';

const html = `
  <div class="page-blocker" (click)="close()"></div>

  <div class="dialog">
    <button class="close" (click)="close()">&times;</button>
    <div class="title">Dialog Title</div>

    <div class="content">Dialog Content</div>

    <div class="actions"></div>
  </div>
`;

/**
  window.hceDialog.open({
    title: 'Custim Title', 
    contents:'This is custom contents',
    actions: [{
      text: 'Custom Button',
      handler: event => {
        alert('My custom button is clicked');
        window.hceDialog.close();
      }
    }]
  });
*/
export class HCEDialog extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(html, css).then(_ => {
      window.hceDialog = this;
    });
  }

  open(data) {
    if (data) {
      this.querySelector('.title').innerHTL = data.title;
      this.querySelector('.content').innerHTL = data.contents;

      if (data.actions !== undefined) {
        const actionsEl = this.querySelector('.actions');
        actionsEl.innerHTML = '';
        data.actions.forEach(action => {
          let buttonEl = document.createElement('mce-button');
          buttonEl.innerHTML = action.text;
          buttonEl.addEventListener('click', action.handler);
          actionsEl.appendChild(buttonEl);
        });
      }
    }
    this.classList.add('visible');
  }

  close() {
    this.classList.remove('visible');
  }
}

HCEDialog.define('hce-dialog', HCEDialog);