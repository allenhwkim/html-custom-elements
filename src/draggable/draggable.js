import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';

export class HCEDraggable extends HTMLCustomElement {
  connectedCallback() {
    this.dragStart; // properties when drag started e.g. {el, el, x: 120, y: 80} in pixel
    this.dropTo; // dropaable element selector. e.g. #drop-to
    this.dropEl; // drop enabled element. default document.body
    this.setAttribute('draggable', 'true'); // this allows to drag
    this._dragoverHandler = this.onDragover.bind(this);
    this._dragleaveHandler = this.onDragleave.bind(this);
    this._dropHandler = this.onDrop.bind(this);

    this.renderWith().then((_) => { // set user-given properties
      this.addEventListener('dragstart', this.onDragstart.bind(this));
      this.dropTo = this.dropTo || this.parentElement.getAttribute('drop-to');

      this.dropEl = this.dropTo ? document.querySelector(this.dropTo) : document.body;
      this.dropEl.addEventListener('drop', this._dropHandler);
      this.dropEl.addEventListener('dragover', this._dragoverHandler);
      this.dropEl.addEventListener('dragleave', this._dragleaveHandler);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dropEl.removeEventListener('drop', this._dropHandler);
    this.dropEl.removeEventListener('dragover', this._dragoverHandler);
    this.dropEl.removeEventListener('dragleave', this._dragleaveHandler);
  }

  onDragstart(event) {
    event.dataTransfer.setData('Text', event.target.id); // id of dropping element

    this.dragStart = {el: this, x: event.clientX, y: event.clientY};
    const bcr = this.getBoundingClientRect();
    this.dispatchEvent(createCustomEvent('drag-start'));
  }

  onDragover(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false; // MUST! allows it to drop
    this.dropTo && this.dropEl.classList.add('on-dragover');
  }

  onDragleave(event) {
    this.dropTo && this.dropEl.classList.remove('on-dragover');
  }

  onDrop(event) { // this happens on body
    if (this.dropTo) {
      this.dropEl.classList.remove('on-dragover');
    } else if (this.dragStart && this.dragStart.el.isEqualNode(this)) { // in case of multiple draggables
      this.move(event);
    }
    this.dragStart = undefined;
  }

  move(event) {
    const move = {
      x: event.clientX - this.dragStart.x,
      y: event.clientY - this.dragStart.y,
    };
    const bcr = this.getBoundingClientRect();
    this.style.position = 'absolute';
    this.style.top = window.scrollY + parseInt(bcr.top) + move.y + 'px';
    this.style.left = window.scrollX + parseInt(bcr.left) + move.x + 'px';
  }
}

HCEDraggable.define('hce-draggable', HCEDraggable);
