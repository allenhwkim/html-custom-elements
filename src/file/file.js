import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';

const fileSVG = `data:image/svg+xml;utf8,
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">
    <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625
      2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z ">
    </path>
    <text x="10" y="35" class="small">SVG</text>
  </svg>`;

const html = `
  <label class="file-zone" tabindex="0">
    {{placeholder}}
    <input type="file" multiple="{{multiple}}"/>
  </label>
  <hce-content></hce-content>
  <ul class="preview"></ul>
`;

const css = `
  :root {text-align: center}
  :root.ready {background: rgba(255, 255, 0, 0.5)}
  .file-zone {cursor: pointer; padding: 4px}
  .file-zone input {display: none;}
  .preview { display: flex; align-items: center; justify-content: center; }
`;


function __setReady(ready) {
  return function(event) {
    event.preventDefault();
    this.classList[ready ? 'add': 'remove']('ready');
  }
};

export class HCEFile extends HTMLCustomElement {
  get files() {
    return this.__files;
  }

  set files(files) {
    if (files.length > 0) {
      this.__files = files;
      const custEvent = createCustomEvent('files-change', {detail: files});
      this.dispatchEvent(custEvent);
      (this.preview !== false) && this.showPreview();
    }
  }

  connectedCallback() {
    this.placeholder = 'Drag, Paste, or Select a File Here';
    this.fileTypes;
    this.renderWith(html, css).then(_ => {
      this.setEventListener();
    }); 
  }

  setEventListener() {
    this.addEventListener('dragover', __setReady(1).bind(this));
    this.addEventListener('dragleave', __setReady(0).bind(this));
    this.addEventListener('drop', this.onFilesChange);
    this.addEventListener('paste', this.onFilesChange);
    this.querySelector('.file-zone input')
      .addEventListener('change', this.onFilesChange.bind(this));
  }

  onFilesChange(event) {
    event.preventDefault();
    this.classList.remove('ready');

    if (event.clipboardData) {
      let files = [];
      for (var i = 0; i < event.clipboardData.items.length; i++) {
        const file = event.clipboardData.items[i].getAsFile();
        file && files.push(file);
      }
      this.files = files;
    } else if (event.dataTransfer) {
      this.files = Array.from(event.dataTransfer.files);
    } else {
      this.files = Array.from(event.target.files);
    }
  }

  showPreview() {
    const preview = this.querySelector('.preview');
    preview.innerHTML = '';
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const li = document.createElement("li");
      
      const img = document.createElement("img");
      if (file.type.match(/image/)) {
        img.src = window.URL.createObjectURL(file);
        img.onload = function() {
          img.width = this.width;
          img.height = this.height;
          window.URL.revokeObjectURL(this.src);
        }
      } else {
        img.src = fileSVG.replace('SVG', file.name.match(/\.(.*)$/)[1].toUpperCase());
      }

      li.appendChild(img);
      const info = document.createElement("span");
      info.innerHTML = file.name + ": " + file.size + " bytes";
      li.appendChild(info);

      preview.appendChild(li);
    }
  }

}

HCEFile.define('hce-file', HCEFile);