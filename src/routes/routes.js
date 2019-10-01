import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import {setInnerHTML} from '../utils';

function getRoutesFromEl(el) {
  const routes = [];
  Array.from(el.children).forEach((child) => {
    const match = child.getAttribute('route-match');
    const url = child.getAttribute('import');
    const isDefault = child.getAttribute('default') !== null;
    (match && url) && routes.push({match: new RegExp(match), import: url});
  });
  return routes;
}

export class HCERoutes extends HTMLCustomElement {
  static get observedAttributes() {
    return ['src'];
  }

  connectedCallback() {
    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';
    this.renderWith().then(_ => {
      this.routes = getRoutesFromEl(this);
      this.popStateListener = this.popStateHandler.bind(this);
      window.addEventListener(popstate, this.popStateListener);

      const matchingRoute = this.getMatchingRoute();
      const src = this.getAttribute('src');

      this.setContentsFromUrl(matchingRoute || src);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && oldValue !== newValue) {
      // console.log('>>>>>>>>>>>>>>>>>>>>>> attribute changed to ', oldValue, newValue);
      this.setContentsFromUrl(newValue);
    }
  }

  // delete window popstate listener
  disconnectedCallback() {
    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';
    window.removeEventListener(popstate, this.popStateListener);
  }

  getMatchingRoute() {
    const locationHref = window.location.href.replace(window.location.origin, '');
    const route = this.routes.filter(route => locationHref.match(route.match))[0];

    if (route) {
      const [m0, m1, m2] = locationHref.match(route.match);
      return route.import.replace(/\{\{1\}\}/g, m1).replace(/\{\{2\}\}/g, m2);
    }
  }

  // window popstate listener
  popStateHandler(event) {
    const src = this.getMatchingRoute();
    src && this.setAttribute('src', src);
  }

  setContentsFromUrl(url) {
    if ((new Date).getTime() - (this.lastCall || 0) < 500) {
      return;
    } else {
      this.lastCall = (new Date).getTime();
    }

    return window.fetch(url).then((response) => {
      if (!response.ok) {
        const err = new Error(`[hce-routes] import url: ${url}, status: ${response.statusText}`);
        setInnerHTML(this, err);
        throw err;
      }
      return response.text();
    }).then(html => {
      setInnerHTML(this, html);
      setTimeout(_ => this.getAttribute('move-to-top') && window.scrollTo(0, 0));
    });
  }
}

HTMLCustomElement.define('hce-routes', HCERoutes);
