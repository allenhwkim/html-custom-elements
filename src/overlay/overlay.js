import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import { showOverlay } from '../utils/show-overlay';

const css = `
  :root:before {
    content: ' ';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: transparent;
  }
  .overlay {
    background: #fff;
    padding: 4px;
    border: 1px solid #ccc;
    z-index: 1;
    box-sizing: border-box;
  }
`;
const html =`
  <div class="overlay">
    <hce-content></hce-content>
  </div>
`;

class HCEOverlay extends HTMLCustomElement {

  connectedCallback() {
    this.style.display = 'none';
    this.renderWith(html, css).then( _ => {
      this.visibleBy && this.setBehaviourOfVisibleBy();

      this.addEventListener('click', event => 
        this.isEqualNode(event.target) && (this.style.display = 'none')
      );
    });
  }

  setBehaviourOfVisibleBy() {
    const actorEl = document.querySelector(this.visibleBy);
    if (actorEl) {
      actorEl.parentElement.style.position = 'relative';

      actorEl.addEventListener('click', this.show.bind(this));
      actorEl.addEventListener('focus', this.show.bind(this));
    }
  }

  show() {
    // hide all overlays
    Array.from(document.querySelectorAll('hce-overlay'))
      .forEach(el => el.style.display = 'none');
    this.style.display = 'block';
    this.position = this.getAttribute('position') || 'top';
    this.distance = parseInt(this.getAttribute('distance') || 12);
    this.arrow = this.getAttribute('arrow') !== 'false';
    // console.log('......', this.position, this.distance, this.arrow)
    setTimeout( _ => {
      showOverlay(
        this.querySelector('.overlay'),
        this.position, 
        {distance: this.distance, arrow: this.arrow}
      );
    })
  }

}

HCEOverlay.define('hce-overlay', HCEOverlay);
