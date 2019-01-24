import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

function getRoutesFromChildren(el) {
  const routes = [];
  Array.from(el.children).forEach(child => {
    const match = child.getAttribute('url-match');
    const url = child.getAttribute('import');
    const isDefault = child.getAttribute('default') !== null;
    if (match && url) {
      routes.push({ match:new RegExp(match), import: url, default: isDefault });
    }
  });
  return routes;
}

function getRoute(routes, url) {
  for(var i=0; i < routes.length; i++) {
    let route = routes[i];
    if (url.match(route.match)) {
      return route;
    }
  }
  const defaultRoute = routes.filter(el => el.default)[0] || routes[0];
  return defaultRoute;
}

function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach(function(el) {

    let newEl = document.createElement("script");
    Array.from(el.attributes).forEach(function(el) { 
      newEl.setAttribute(el.name, el.value);
    });

    newEl.appendChild(document.createTextNode(el.innerHTML));
    el.parentNode.replaceChild(newEl, el);
  });
}

export class HCEDynamicContents extends HTMLCustomElement {
  connectedCallback() {
    this.routes = getRoutesFromChildren(this);

    const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
    const popstate = supportsPopState ? 'popstate' : 'hashchange';

    this.popStateHandler(); // load the contents
    window.addEventListener(popstate, this.popStateHandler.bind(this));
  }

  popStateHandler(event) {
    let route = getRoute(this.routes, window.location.href);
    if (route) {
      window.fetch(route.import).then(response => {
        if (!response.ok) {
          throw Error(`[hce-dyn-contents] import url: ${route.import}, status: ${response.statusText}`);
        }
        return response.text();
      }).then(html => {
        setInnerHTML(this, html)
        setTimeout(_ => window.scrollTo(0, 0));
      });
    }
  }
}

HTMLCustomElement.define('hce-dyn-contents', HCEDynamicContents);