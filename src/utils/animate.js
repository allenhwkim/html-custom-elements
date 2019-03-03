export function animate({
  duration = 350,
  timing = (t => t),
  draw
}) {
  const start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    const progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

export function disappear(el) {
  const compStyle = window.getComputedStyle(el);
  (compStyle.transitionDuration === '0s') && (el.style.transition = 'opacity .25s linear');
  el.style.opacity = 0;
  setTimeout((_) => el.style.display = 'none', 300);
}

export function appear(el, as) {
  const compStyle = window.getComputedStyle(el);
  (compStyle.transitionDuration === '0s') && (el.style.transition = 'opacity .25s linear');
  el.style.display = as || el.displayStyle || 'block';
  el.style.opacity = 0;
  setTimeout((_) => el.style.opacity = 1, 20);
}
