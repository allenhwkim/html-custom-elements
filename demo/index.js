import '../src';
import Prism from 'prismjs';

window.showCode = function(htmlId, jsId, cssId, highlight) {
  const el = document.createElement('div');
  el.insertAdjacentHTML('beforeend', `
    <hce-tabs class="code">
      <div class="tabs">
        <i tab-for="html">html</i>
        <i tab-for="js">js</i>
        <i tab-for="css">css</i>
      </div>
      <div class="contents" style="background:#f8f8f8"> 
        <div contents-for="html"><pre></pre></div>
        <div contents-for="js"><pre></pre></div>
        <div contents-for="css"><pre></pre></div>
      </div>
    </hce-tabs>`);
  document.currentScript.insertAdjacentElement('afterend', el);

  function fillCode(id, type) {
    let srcEl, dstEl, html;
    if (id) {
      srcEl = document.getElementById(id);
      dstEl = el.querySelector(`[contents-for=${type}] pre`);
      const lang = type === 'js' ? 'javascript': type;
      html = Prism.highlight(srcEl.outerHTML, Prism.languages[lang], lang);
      html = html.replace(/hce-[\w]+/g, $0 => `<b>${$0}</b>`)
      highlight && ( html = html.replace(highlight, $0 => `<b>${$0}</b>`) )
      dstEl.innerHTML = html;
    } else {
      el.querySelector(`[tab-for=${type}]`).remove();
      el.querySelector(`[contents-for=${type}]`).remove();
    }
  }

  fillCode(htmlId, 'html');
  fillCode(jsId, 'js');
  fillCode(cssId, 'css');
}

window.highlight = function(lang = 'javascript') {
  const codeEl = document.currentScript.previousElementSibling;
  const html = Prism.highlight(codeEl.innerHTML, Prism.languages[lang], lang);
  codeEl.innerHTML = html;
}