import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
function __objectToArray(obj) {
  const ret = [];
  for (var key in obj) {
    const item = typeof obj[key] === 'object' ?
      Object.assign(obj[key], {key}) : {key, value: obj[key]} ;
    ret.push(item);
  }
  return ret;
}

const html = `
  <div class="list"></div>
`;

const css = `
  .blocker {            /* Needed to check click outside of overlay */
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #333;
    opacity: 0.3;
    z-index: 0;
  }
  .list {           /* overlay contents on thetop of blocker */
    background: #fff;
    z-index: 1;
  }
`;

export class HCEDynList extends HTMLCustomElement {
  get source() {
    return this.__source;
  }

  set source(source) {
    this.__source = source;
    source && this.__setList();
  }

  connectedCallback() {
    const templateEl = this.children[0];
    this.template = templateEl && templateEl.outerHTML;
    templateEl.remove();
    this.renderWith(html, css).then(_ => {
      this.setBehaviourOfVisibleBy(this.visibleBy, this);
    });
  }

  setBehaviourOfVisibleBy(visibleBy, overlayEl) {
    if (visibleBy && !document.querySelector(visibleBy)) {
      console.error('[hce-dyn-list] element not found by selector', visibleBy);
      return false;
    }
    
    let overlayClicked = false;
    const inputEl = document.querySelector(visibleBy);
    const blockerEl = document.createElement('div');
    const listEl = overlayEl.querySelector('.list');
    blockerEl.className = 'blocker';
    inputEl.parentElement.style.position = 'relative';
    listEl.style.position = 'absolute';
    overlayEl.appendChild(blockerEl);
    overlayEl.style.display = 'none';

    overlayEl.addEventListener('click', _ => overlayClicked = true);
    blockerEl.addEventListener('click', _ =>  overlayEl.style.display = 'none');

    inputEl.setAttribute('autocomplete', 'off');
    inputEl.addEventListener('blur', _ => {
      setTimeout(_ => {
        if (!overlayClicked) {
          overlayEl.style.display = 'none';
        }
        overlayClicked = false;
      }, 500);
    })

    let timeout = null;
    inputEl.addEventListener('keyup', _ => {
      const result = this.sourceFunc();
      if (result) {
        clearTimeout(timeout);
        timeout = setTimeout(_ => {
          result.then(src => {
            this.source = src;
            overlayEl.style.display = 'block';
          })
        }, 500); // keyboard delay for .5 second
      }
    });

  }

  __setList() {
    this.querySelector('.list') && (this.querySelector('.list').innerHTML = '');
    const promise = this.source.then ? this.source : Promise.resolve(this.source);
    promise.then(src => {
      src = src instanceof Array ? src : __objectToArray(src);
      src.forEach(item => {
        const html = this.template.replace(/{{(.*?)}}/g, ($0, expr) => {
          const func = (new Function(`return this.${expr}`)).bind(item);
          return func();
        })
        const frag = document.createRange().createContextualFragment(html);
        const itemEl = frag.querySelector('*');
        const listSelected = event => {
          const custEvent = createCustomEvent('selected', {detail: item});
          this.dispatchEvent(custEvent);
        } 
        itemEl.addEventListener('click', listSelected);
        itemEl.addEventListener('keydown', event => event.key === 'Enter' && listSelected(event));
        itemEl.setAttribute('tabindex', 0);
        this.querySelector('.list').appendChild(itemEl);
      });
    });
  }

}

HCEDynList.define('hce-dyn-list', HCEDynList);