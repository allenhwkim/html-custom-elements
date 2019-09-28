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

  connectedCallback() {
    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';

    this.routes = getRoutesFromEl(this);
    this.popStateHandler = this.routes.length ?
      this.replaceContentsHandler.bind(this) : this.setActiveLinksHandler.bind(this);

    this.popStateHandler(); // load the contents or set active links
    window.addEventListener(popstate, this.popStateHandler);
  }

  // delete window popstate listener
  disconnectedCallback() {
    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';
    window.removeEventListener(popstate, this.popStateHandler);
  }

  // window popstate listener
  replaceContentsHandler(event) {
    const locationHref = window.location.href.replace(window.location.origin, '');
    const route = this.routes.filter(route => locationHref.match(route.match))[0];

    let src;
    if (route) {
      const [m0, m1, m2] = locationHref.match(route.match);
      src = route.import.replace(/\{\{1\}\}/g, m1).replace(/\{\{2\}\}/g, m2);
    }
    src = src || this.getAttribute('src');
    console.log('[hce-route] replaceContentsHandler', this, {route, src, routes: this.routes});

    return this.setContentsFromUrl(src);
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
      this.setAttribute('src', url);
      setInnerHTML(this, html);
      setTimeout(_ => this.getAttribute('move-to-top') && window.scrollTo(0, 0));
    });
  }

  // window popstate listener
  setActiveLinksHandler(event) {
    Array.from(this.querySelectorAll('[href')).forEach(hrefEl => {
      if (hrefEl.href === window.location.href) {
        hrefEl.classList.add('active');
      } else {
        hrefEl.classList.remove('active');
        !hrefEl.className && hrefEl.removeAttribute('class');
      }
    });
  }
}

HTMLCustomElement.define('hce-routes', HCERoutes);
