import { showOverlay, addArrow } from '../utils';
import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

const css = `
  :root {
    display: none;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 4px 4px #f2f4f6;
    box-shadow: 4px 4px #f2f4f6;
    min-width: 120px;
    padding: 6px;
    z-index: 1;
  }
  .hce-arrow {
    color: #fff;
    border: 1px solid #ccc;
    border-width: 0 0 1px 1px;
    width: 12px;
    height: 12px;
    background: #fff;
    position: absolute;
  }
`;

class HCETooltip extends HTMLCustomElement {

  connectedCallback() {
    this.renderWith(null, css).then(() => {
      this.position = this.position || 'top'; 
      this.parentElement.addEventListener('mouseover', this.show.bind(this));
      this.parentElement.addEventListener('mouseout', this.hide.bind(this));
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
    addArrow(this, overlayPos, this.distance);
  }

  hide() {
    this.style.display = 'none';
  }

}

HTMLCustomElement.define('hce-tooltip', HCETooltip);

