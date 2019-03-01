function addArrow(parentEl, pos = 'top-center, vertical, outside') {
  let arrowEl = parentEl.querySelector('.hce-arrow');
  if (!arrowEl) {
    arrowEl = document.createElement('div');
    arrowEl.className = 'hce-arrow';
    arrowEl.innerHTML = ' ';
    arrowEl.style.cssText = `
      background: inherit;
      color: inherit;
      border: inherit;
      border-width: 0 0 1px 1px;
      width: 8px;
      height: 8px;
      position: absolute;`;
    parentEl.appendChild(arrowEl);
  }

  const [posYX, hv, inOut] = pos.split(',').map((el) => (el || '').trim());
  const [posY, posX] = posYX.split('-');
  const deg =
    hv === 'vertical' && posY === 'top' ? '-45' :
    hv === 'vertical' && posY === 'bottom' ? '135' :
    hv === 'horizontal' && posX === 'left' ? '-135' :
    hv === 'horizontal' && posX === 'right' ? '45' : '';
  arrowEl.style.transform = '';
  arrowEl.style.top = '';
  arrowEl.style.left = '';
  arrowEl.style[posY] = '';
  arrowEl.style[posX] = '';

  arrowEl.style.transform = 'rotate(' + deg + 'deg)';
  if (hv === 'vertical') {
    arrowEl.style[posY] = `calc(100% - 4px)`;
    if (posX === 'center') {
      arrowEl.style.left = `calc(50% - 4px)`;
    } else {
      arrowEl.style[posX] = `8px`;
    }
  } else if (hv === 'horizontal') {
    arrowEl.style[posX] = `calc(100% - 4px)`;
    if (posY === 'center') {
      arrowEl.style.top = `calc(50% - 4px)`;
    } else {
      arrowEl.style[posY] = `8px`;
    }
  }
}

export function showOverlay(el, pos='top-center, vertical, outside', options) {
  console.log('xxxxxxxxxxxxxxx', el);
  pos =
    (pos === 'top' || pos == 'bottom') ? `${pos}-center, vertical, outside` :
    (pos === 'left' || pos == 'right') ? `center-${pos}, horizontal, outside` : pos;
  const [posYX, hv, inOut] = pos.split(',').map((el) => (el || '').trim());
  const [posY, posX] = posYX.split('-');
  const olcss = el.style;
  const distance =( options && options.distance ) || '12';
  const showArrow = (options && options.arrow);
  const calc = `calc(100% + ${distance}px)`;

  olcss.position = 'absolute';
  olcss.display = 'inherit';
  olcss.transform = '';

  if (hv === 'horizontal' && inOut === 'outside') {
    olcss.top = posY === 'top' ? '0' : 'inherit';
    olcss.bottom = posY === 'bottom' ? '0' : 'inherit';
    olcss.left = posX === 'right' ? calc : 'inherit';
    olcss.right = posX === 'left' ? calc : 'inherit';
    if (posY === 'center') {
      olcss.top = '50%';
      olcss.transform = 'translate(0, -50%)';
    }
  } else if (hv === 'vertical' && inOut === 'outside') {
    olcss.top = posY === 'bottom' ? calc : 'inherit';
    olcss.bottom = posY === 'top' ? calc : 'inherit';
    olcss.left = posX === 'left' ? '0' : 'inherit';
    olcss.right = posX === 'right' ? '0' : 'inherit';
    if (posX === 'center') {
      olcss.left = '50%';
      olcss.transform = 'translate(-50%, 0)';
    }
  } else { // inside overlay
    olcss.top = posY === 'top' ? '0' : 'inherit';
    olcss.bottom = posY === 'bottom' ? '0' : 'inherit';
    olcss.left = posX === 'left' ? '0' : 'inherit';
    olcss.right = posX === 'right' ? '0' : 'inherit';
    console.log(olcss.top, olcss.bottom, olcss.left, olcss.right);
    if (posY === 'center') {
      olcss.top = '50%';
      olcss.transform = posX === 'center' ? 'translate(-50%, -50%)' : 'translate(0, -50%)';
    }
    if (posX === 'center') {
      olcss.left = '50%';
      olcss.transform = posY === 'center' ? 'translate(-50%, -50%)' : 'translate(-50%, 0)';
    }
  }

  if (showArrow) {
    addArrow(el, pos);
  } else {
    el.querySelector('.hce-arrow') && el.querySelector('.hce-arrow').remove();
  }

  return el;
}
