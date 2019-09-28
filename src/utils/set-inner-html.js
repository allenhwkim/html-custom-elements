export function setInnerHTML(elm, html) {
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

