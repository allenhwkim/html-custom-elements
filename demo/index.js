import '../src';
import Prism from 'prismjs';

window.prettify = function(selector, type, highlight) {
  const el = document.querySelector(selector);
  const html = type === 'html' ? el.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : el.innerHTML;
  const prettyOne = Prism.highlight(html, Prism.languages[type], type);
  el.innerHTML = prettyOne.replace(highlight, _ => `<b>${_}</b>`);
};

window.showCode = function(htmlId, jsId, cssId, highlight) {
  const el = document.createElement('div');
  el.insertAdjacentHTML('beforeend', `
    <hce-tabs class="code">
      <div class="hce-tabs">
        <i tab="html">html</i>
        <i tab="js">js</i>
        <i tab="css">css</i>
      </div>
      <div class="hce-contents" style="background:#f8f8f8"> 
        <div tab="html"><pre></pre></div>
        <div tab="js"><pre></pre></div>
        <div tab="css"><pre></pre></div>
      </div>
    </hce-tabs>`);
  document.currentScript.insertAdjacentElement('afterend', el);

  function fillCode(id, type) {
    let srcEl;
    let dstEl;
    let html;
    if (id) {
      srcEl = document.getElementById(id);
      dstEl = el.querySelector(`.hce-contents [tab=${type}] pre`);
      const lang = type === 'js' ? 'javascript': type;
      html = Prism.highlight(srcEl.innerHTML.replace(/^\n(\s+)/, '$1'), Prism.languages[lang], lang);
      html = html.replace(/hce-[\w-]+/g, $0 => `<b>${$0}</b>`);
      highlight && ( html = html.replace(highlight, $0 => `<b>${$0}</b>`) );
      dstEl.innerHTML = html;
    } else {
      el.querySelector(`.hce-tabs [tab=${type}]`).remove();
      el.querySelector(`.hce-contents [tab=${type}]`).remove();
    }
  }

  fillCode(htmlId, 'html');
  fillCode(jsId, 'js');
  fillCode(cssId, 'css');
};

window.highlight = function(lang = 'javascript') {
  const codeEl = document.currentScript.previousElementSibling;
  const html = Prism.highlight(codeEl.innerHTML, Prism.languages[lang], lang);
  codeEl.innerHTML = html;
};
