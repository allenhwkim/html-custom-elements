import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

// from https://icons8.com/preloaders/
const svg = `
  <svg width="64px" height="64px" viewBox="0 0 128 128"  xml:space="preserve"><g>
    <circle cx="16" cy="64" r="16" fill="%23000000" fill-opacity="1"/>
    <circle cx="16" cy="64" r="16" fill="%23555555" fill-opacity="0.67" transform="rotate(45,64,64)"/>
    <circle cx="16" cy="64" r="16" fill="%23949494" fill-opacity="0.42" transform="rotate(90,64,64)"/>
    <circle cx="16" cy="64" r="16" fill="%23cccccc" fill-opacity="0.2" transform="rotate(135,64,64)"/>
    <animateTransform attributeName="transform" type="rotate" 
      calcMode="discrete" dur="720ms" repeatCount="indefinite"
      values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64">
    </animateTransform>
  </g></svg>`;

  const css =`
  :root {
    display: flex; 
    position: absolute;
    align-items: center; 
    justify-content: center;
    background: #fff;
    opacity: 0.5;
    width: 100%; height: 100%;
    top:0; left: 0;
  }
  :root > *:first-child {
    width: 100%;
    height: 100%;
    max-width: 64px;
  }
`

class HCELoading extends HTMLCustomElement {
  connectedCallback() {
    this.renderWith(null, css).then( _ => {
      (!this.innerHTML.trim()) && (this.innerHTML = svg);
      this.style.display = this.loading === '' || this.loading ? 'flex' : 'none';
    });
  }

  show() {
    this.style.display = 'flex';
  }

  hide() {
    this.style.display = 'none';
  }
}

HCELoading.define('hce-loading', HCELoading);