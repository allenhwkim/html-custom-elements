
export function showOverlay(el, pos, distance = 12) {
  const overlay =  typeof el === 'string' ? this.querySelector(el) : el;
  const [posYX, hv, inOut] = pos.split(',').map(el => (el || '').trim());
  const [posY, posX] = posYX.split('-');
  const olcss = overlay.style;
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
    olcss.right = posX === 'right' ? '0' : 'inheritt';
  }

  return el;
}
