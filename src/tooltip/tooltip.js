import {showOverlay, hideOverlay} from '../utils/show-overlay';
import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';

const css = `
  :root {
    display: none;
    background: #1b1f23;
    border-radius: 4px;
    min-width: 120px;
    padding: 6px 12px;
    z-index: 1;
    color: #fff;
  }
`;

class HCETooltip extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(null, css).then(() => {
      this.position = this.position || 'top';
      this.parentElement.setAttribute('tabindex', 0);
      this.parentElement.addEventListener('mouseover', this.show.bind(this));
      this.parentElement.addEventListener('mouseout', this.hide.bind(this));
      this.parentElement.addEventListener('focus', this.show.bind(this));
      this.parentElement.addEventListener('blur', this.hide.bind(this));
      (this.visible==='' || this.visible) && this.show();
    });
  }

  show() {
    showOverlay(this, this.position, {distance: this.distance, arrow: true});
  }

  hide() {
    hideOverlay(this);
  }
}

HTMLCustomElement.define('hce-tooltip', HCETooltip);

