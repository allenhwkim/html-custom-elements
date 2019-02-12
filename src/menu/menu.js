import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import * as css from './menu.css';

const html = `
<nav role="navigation">
  <hce-content></hce-content>
</nav>
`;

class HCEMenu extends HTMLCustomElement {
  static get observedAttributes() { return ['selected-index']; }

  get selectedIndex() { return this.__selectedIndex; }

  set selectedIndex(selectedIndex) {
    this.__selectedIndex = selectedIndex;
    Array.from(this.querySelectorAll('ul > li')).forEach((liEl, ndx) =>  {
      const func = ndx === selectedIndex ? 'add' : 'remove';
      liEl.classList[func]('selected');
    })
  }

  connectedCallback() {
    this.renderWith(null, css).then( _ => {
      this.setAccessibility();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    (name === 'selected-index') && (this.selectedIndex = parseInt(newValue));
  }

  setAccessibility() {
    const liEls = this.querySelectorAll('li');
    Array.from(liEls).forEach(liEl => {
      if (liEl.querySelector('ul')) { // if submenu exists
        liEl.classList.add('has-submenu');
        liEl.setAttribute('tabindex', 0);       // make it as an action item
        const aEls = liEl.querySelectorAll('a');
        // control show/hide by class 'submenu-open'
        liEl.addEventListener('blur', _ => liEl.classList.remove('submenu-open'));
        Array.from(aEls).forEach(aEl => {
          aEl.addEventListener('focus', _ => liEl.classList.add('submenu-open'));
          aEl.addEventListener('blur', _ => {
            setTimeout(_ => { //next focus needs time
              const focused = liEl.querySelector(':focus');
              !focused && liEl.classList.remove('submenu-open');
            }, 10);
          })
        })
      }
    });
  }
}

HCEMenu.define('hce-menu', HCEMenu);