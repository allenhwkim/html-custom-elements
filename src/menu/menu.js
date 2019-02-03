import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

const html = `
<nav role="navigation">
  <hce-content></hce-content>
</nav>
`;
const css = `
  a { text-decoration: none; white-space: nowrap; text-transform: uppercase }
  li > ul { display: none; } /* hide all submenus in default */

  /* submenu */
  li.has-submenu:hover > ul { display: block;}
  li.has-submenu:focus > ul { display: block;}
  li.has-submenu.open > ul { display: block;}

  :root.basic a { transition: all .2s; color: inherit }
  :root.basic a:hover { color: #fff }
  :root.basic ul { margin: 0; padding: 0; list-style: none; background: #333; color: #fff }
  :root.basic li { padding: 8px; position: relative; color: #aaa; }
  :root.basic > ul > li { padding: 15px; }   /* first-level menu items */
  :root.basic li ul{ position: absolute; } 

  :root.top > ul { display: flex; justify-content: space-around }
  :root.top li > ul ul { top: 1px; left: calc(100% + 1px); } /* non-first-level menu items */
  :root.top li > ul { top: calc(100% + 1px); left: 0;}

  :root.bottom > ul { display: flex; justify-content: space-around }
  :root.bottom li > ul ul { bottom: 0; left: calc(100% + 1px); } /* non-first-level menu items */
  :root.bottom li > ul { bottom: calc(100% + 1px); left: 0;}

  :root.left > ul { display: inline-block; }
  :root.left li > ul {top: 0; left: calc(100% + 1px);}

  :root.right > ul { display: inline-block; }
  :root.right li > ul {top: 0; right: calc(100% + 1px);}
`;

class HCEMenu extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(null, css).then( _ => {
      this.setAccessibility();
    });
  }

  setAccessibility() {
    const liEls = this.querySelectorAll('li');
    Array.from(liEls).forEach(liEl => {
      if (liEl.querySelector('ul')) { // if submenu exists
        liEl.classList.add('has-submenu');
        liEl.setAttribute('tabindex', 0);       // make it as an action item
        const aEls = liEl.querySelectorAll('a');
        // control show/hide by class 'open'
        liEl.addEventListener('blur', _ => liEl.classList.remove('open'));
        Array.from(aEls).forEach(aEl => {
          aEl.addEventListener('focus', _ => liEl.classList.add('open'));
          aEl.addEventListener('blur', _ => {
            setTimeout(_ => { //next focus needs time
              const focused = liEl.querySelector(':focus');
              !focused && liEl.classList.remove('open');
            }, 10);
          })
        })
      }
    });
  }
}

HCEMenu.define('hce-menu', HCEMenu);