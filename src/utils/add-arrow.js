
export function addArrow(parentEl, pos = 'top-center, vertical, outside', distance = 12) {
  let arrowEl = parentEl.querySelector('.hce-arrow');
  if (!arrowEl) {
    arrowEl = document.createElement('div');
    arrowEl.className = 'hce-arrow';
    arrowEl.innerHTML = ' ';
    arrowEl.setAttribute(
      'style', 
      'color: #fff; border: 1px solid #ccc; border-width: 0 0 1px 1px; ' + 
      'width: 12px; height: 12px; background: #fff; position: absolute;'
    );
    parentEl.appendChild(arrowEl);
  }

  const [posYX, hv, inOut] = pos.split(',').map(el => (el || '').trim());
  const [posY, posX] = posYX.split('-');
  const deg =
    hv === 'vertical' && posY === 'top' ? '-45' :
    hv === 'vertical' && posY === 'bottom' ? '135' :
    hv === 'horizontal' && posX === 'left' ? '-135' :
    hv === 'horizontal' && posX === 'right' ? '45' : '';
  arrowEl.setAttribute('style', '');

  arrowEl.style.transform = 'rotate(' + deg + 'deg)';
  if (hv === 'vertical') {
    arrowEl.style[posY] = 'calc(100% - 6px)';
    if (posX === 'center') {
      arrowEl.style.left = 'calc(50% - 6px)';
    } else {
      arrowEl.style[posX] = `${distance}px`;
    }
  } else if (hv === 'horizontal') {
    arrowEl.style[posX] = `calc(100% - 6px)`;
    if (posY === 'center') {
      arrowEl.style.top = `calc(50% - 6px)`;
    } else {
      arrowEl.style[posY] = `${distance}px`;
    }
  }
}