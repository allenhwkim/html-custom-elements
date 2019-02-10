import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import css from './snackbar.css';

const customCss = `
  @keyframes slideInUp {
    from { transform: translate3d(0,100%,0)  translate(-50%); opacity: 0; }
    to { opacity: 1; transform: translateZ(0) translate(-50%); }
  }
  @keyframes slideOutDown {
    from { opacity: 1; transform: translateZ(0) translate(-50%); }
    to { opacity: 0; transform: translate3d(0,100%,0) translate(-50%); }
  }`;

export class HCESnackbar extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(null, css, customCss);
  }

  set message(msg) {
    this.innerHTML = this.__message = msg;
    this.style.visibility = 'visible';
    this.style.animation = 'slideInUp 0.5s, slideOutDown 0.5s 2.5s';

    setTimeout(_ => {
      this.style.visibility = 'hidden';
      this.style.animation = 'none';
    }, 3000);
  }

}

HCESnackbar.define('hce-snackbar', HCESnackbar);