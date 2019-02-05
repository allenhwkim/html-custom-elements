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
  :root.overlay:before {            /* Needed to check click outside of overlay */
    content: ' ';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: transparent;
  }
  :root.overlay .list {
    background: #fff;
    position: absolute;
    padding: 4px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .14),
      0px 1px 1px 0px rgba(0, 0, 0, .12), 
      0px 2px 1px -1px rgba(0, 0, 0, .4);
    z-index: 1;
  }
`;

export class HCEDynList extends HTMLCustomElement {
  get source() {
    return this.__source;
  }

  set source(source) {
    this.__source = source;
    this.querySelector('.list') && (this.querySelector('.list').innerHTML = '');
    if (source) {
      this.__setList();
    }
  }

  connectedCallback() {
    const templateEl = this.children[0];
    this.template = templateEl && templateEl.outerHTML;
    templateEl.style.display = 'none';
    this.renderWith(html, css).then(_ => {
      if (this.visibleBy) {
        const source = this.getAttribute('[source]') || this.getAttribute('source');
        const expression = source.match(/[^\(]+/)[0];
        this.sourceFunc = new Function(`return ${expression};`);
      }
      this.visibleBy && this.setBehaviourOfVisibleBy(this.visibleBy, this);
    });
  }

  setBehaviourOfVisibleBy(visibleBy) {
    if (visibleBy && !document.querySelector(visibleBy)) {
      console.error('[hce-dyn-list] element not found by selector', visibleBy);
      return false;
    }
    const inputEl = document.querySelector(visibleBy);
    inputEl.setAttribute('autocomplete', 'off');
    inputEl.parentElement.style.position = 'relative';

    let timeout = null;
    inputEl.addEventListener('keyup', _ => {
      const result = this.sourceFunc()();
      if (result) {
        clearTimeout(timeout);
        timeout = setTimeout(_ => {
          this.classList.add('overlay');
          result.then(src => {
            this.source = src;
            this.style.display = 'block';
          })
        }, 100); // keyboard delay for .5 second
      } else {
        this.source = [];
      }
    });

    this.style.display = 'none';
    this.addEventListener('click', _ => {
      if (this.isEqualNode(event.target)) {
        this.style.display = 'none';
      }
    });
  }

  __setList() {
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
          this.visibleBy && (this.style.display = 'none');
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