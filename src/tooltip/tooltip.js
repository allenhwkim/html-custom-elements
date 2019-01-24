import { showOverlay, addArrow } from '../utils';
import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

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
  .hce-arrow {
    background: inherit;
    color: inherit;
    border: inherit;
    border-width: 0 0 1px 1px;
    width: 8px;
    height: 8px;
    position: absolute;
  }
`;

class HCETooltip extends HTMLCustomElement {

  connectedCallback() {
    this.renderWith(null, css).then(() => {
      this.position = this.position || 'top'; 
      this.parentElement.addEventListener('mouseover', this.show.bind(this));
      this.parentElement.addEventListener('mouseout', this.hide.bind(this));
      this.parentElement.addEventListener('focus', this.show.bind(this));
      this.parentElement.addEventListener('blur', this.hide.bind(this));
      (this.visible==='' || this.visible) && this.show();
    });
  }

  show() {
    let overlayPos;
    if (this.position === 'top' || this.position == 'bottom') {
      overlayPos = `${this.position}-center, vertical, outside`;
    } else if (this.position === 'left' || this.position == 'right') {
      overlayPos = `center-${this.position}, horizontal, outside`;
    }
    showOverlay(this, overlayPos, this.distance);
    addArrow(this, overlayPos, 8);
  }

  hide() {
    this.style.display = 'none';
  }

}

HTMLCustomElement.define('hce-tooltip', HCETooltip);

