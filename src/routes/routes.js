import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';

function getRoutesFromChildren(el) {
  const routes = [];
  Array.from(el.children).forEach((child) => {
    const match = child.getAttribute('route-match');
    const url = child.getAttribute('import');
    const isDefault = child.getAttribute('default') !== null;
    if (match && url) {
      routes.push({match: new RegExp(match), import: url, default: isDefault});
    }
  });
  return routes;
}

function getRoute(routes) {
  const url = window.location.href.replace(window.location.origin, '');
  for (let i=0; i < routes.length; i++) {
    const route = routes[i];
    if (url.match(route.match)) {
      return route;
    }
  }
}

function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll('script')).forEach(function(el) {
    const newEl = document.createElement('script');
    Array.from(el.attributes).forEach(function(el) {
      newEl.setAttribute(el.name, el.value);
    });

    newEl.appendChild(document.createTextNode(el.innerHTML));
    try {
      el.parentNode.replaceChild(newEl, el);
    } catch (e) {
      console.error('Invalid Javascript error with '+el.innerHTML, e);
    }
  });
}

export class HCERoutes extends HTMLCustomElement {
  connectedCallback() {
    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';

    this.routes = getRoutesFromChildren(this);
    this.popStateHandler = this.routes.length ?
      this.replaceContentsHandler.bind(this) : this.setActiveLinksHandler.bind(this);

    this.popStateHandler(); // load the contents or set active links
    window.addEventListener(popstate, this.popStateHandler);
  }

  disconnectedCallback() {
    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';
    console.log('[hce-route] removing popstate handler', this.popStateHandler);
    window.removeEventListener(popState, this.popStateHandler);
  }

  replaceContentsHandler(event) {
    const route = getRoute(this.routes);
    console.log('[hce-route] replaceContentsHandler', 'event', event, 'routes', this.route, 'route', route);
    if (route) {
      window.fetch(route.import).then((response) => {
        if (!response.ok) {
          throw Error(`[hce-routes] import url: ${route.import}, status: ${response.statusText}`);
        }
        return response.text();
      }).then((html) => {
        setInnerHTML(this, html);
        if (this.getAttribute('move-to-top')) {
          setTimeout((_) => window.scrollTo(0, 0));
        }
      });
    }
  }

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
